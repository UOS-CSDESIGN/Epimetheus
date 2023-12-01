package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import uos.capstone.epimetheus.adapter.CodeValidationResponse;
import uos.capstone.epimetheus.adapter.LlamaAdapter;
import uos.capstone.epimetheus.dtos.TaskStep;
import uos.capstone.epimetheus.dtos.exception.CodeValidationException;
import uos.capstone.epimetheus.dtos.llamaTasks.*;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RequiredArgsConstructor
@Service
@Log4j2
public class TaskServiceStreamImpl implements TaskSerivce {

    private final LlamaAdapter llamaAdapter;
    private final DatabaseService databaseService;
    private final SimilarityService similarityService;
    private final TaskExecuteService taskExecuteService;

    @Value("${llama.breakpoint}")
    private String stopWord;
    
    private String introChar = "Intro:";
    private String outroChar = "Outro:";

    @Override
    public Flux<SubTaskResolver> getSubTaskListInStream(String task) {
        StringBuffer buffer = new StringBuffer();
        AtomicInteger state = new AtomicInteger(-1);
        AtomicInteger stepNo = new AtomicInteger(0);

        Pattern stepPattern = Pattern.compile("!!Step(\\d+)\\.");
        Pattern descriptionPattern = Pattern.compile("%%Description(\\d+)\\.");

        return llamaAdapter.getAllTaskSteps(task).flatMap(llamaStepResponse -> {
            Flux<SubTaskResolver> subTask = Flux.empty();
            StringBuilder data = llamaStepResponse.parseStreamContent();
            Matcher stepMatcher = stepPattern.matcher(buffer);
            Matcher descriptionMatcher = descriptionPattern.matcher(buffer);

            if(buffer.indexOf(introChar) != -1 && state.get() == -1) {
                state.set(0);
                buffer.delete(0, buffer.indexOf(introChar) + introChar.length());
            }

            //Before was Step stop
            if(!buffer.isEmpty() && stepMatcher.find() && state.get() == 1) {
                String step = stepMatcher.group(0);
                stepNo.set(Integer.parseInt(stepMatcher.group(1)));
                buffer.delete(0, buffer.indexOf(step) + step.length());
                state.set(2);
            }
            //Before was Description stop
            if(!buffer.isEmpty() && descriptionMatcher.find() && state.get() == 2) {
                String description = descriptionMatcher.group(0);
                String content = stepTitleParse(buffer, description);
                subTask = Flux.just(SubTaskTitle.builder()
                        .stepNo(stepNo.get())
                        .title(content)
                        .property(ResponseStreamProperty.TITLE)
                        .build());
                buffer.delete(0, buffer.indexOf(description) + description.length());
                state.set(3);
            }
            if(buffer.indexOf(outroChar) != -1 && state.get() == 1) {
                stepNo.set(0);
                state.set(4);
                buffer.delete(0, buffer.indexOf(outroChar) + outroChar.length());
            }

            if(buffer.indexOf(stopWord) != -1) {
                //If Before was Intro
                if(state.get() == 0) {
                    subTask = Flux.just(SubTaskIntro.builder()
                            .stepNo(0)
                            .wrapper(stopWordParse(buffer))
                            .property(ResponseStreamProperty.INTRO)
                            .build());
                }
                //If Before was Description
                if(state.get() == 3) {
                    subTask = Flux.just(SubTaskDescription.builder()
                            .stepNo(stepNo.get())
                            .description(stopWordParse(buffer))
                            .property(ResponseStreamProperty.DESCRIPTION)
                            .build());
                }
                //If Before was Outro
                if(state.get() == 4) {
                    subTask = Flux.just(SubTaskOutro.builder()
                            .stepNo(0)
                            .wrapper(stopWordParse(buffer))
                            .property(ResponseStreamProperty.OUTRO)
                            .build());
                }
                buffer.delete(0, buffer.indexOf(stopWord) + stopWord.length());
                state.set(1);
            }

            buffer.append(data);
            return subTask;
        });

    }

    private String stepTitleParse(StringBuffer stringBuffer, String description) {
        return stringBuffer.substring(0, stringBuffer.indexOf(description)).trim();
    }

    private String stopWordParse(StringBuffer stringBuffer){
        return stringBuffer.substring(0, stringBuffer.indexOf(stopWord)).trim();
    }

    @Override
    public String saveCode(TaskStep taskStep){
        String checkCode = taskExecuteService.executeSubTask(taskStep);
        if(checkCode.contains(CodeValidationResponse.SUCCESS.getMessage())) {
            databaseService.updateCode(taskStep);
            return checkCode;
        }

        throw new CodeValidationException(checkCode);
    }

    @Override
    public SubTaskCode getSimilarCode(String step) {
        TaskStep stepCode = similarityService.getSimilarStep(step);

        return SubTaskCode.builder()
                .code(stepCode.getCode())
                .property(ResponseStreamProperty.CODE)
                .language(CodeLanguage.of(stepCode.getLanguage()))
                .build();
    }
}

