package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import uos.capstone.epimetheus.adapter.LlamaAdapter;
import uos.capstone.epimetheus.dtos.LlamaStepResponse;
import uos.capstone.epimetheus.dtos.TaskStep;
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
            StringBuilder data = llamaStepResponse.parseContent();
            Matcher stepMatcher = stepPattern.matcher(buffer);
            Matcher descriptionMatcher = descriptionPattern.matcher(buffer);

        return Flux.create(sink -> {
            llamaAdapter.getAllTaskSteps(task)
                    .map(LlamaStepResponse::parseContent)
                    .doOnNext(data -> {

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

                        else {
                            Matcher matcher = pattern.matcher(buffer);
                            if(matcher.find()) {
                                if (stepNo.get() == 0) {
                                    buffer.setLength(0);
                                } else if (state.get() == 1) {
                                    String title = matcherParse(buffer, matcher.start());
                                    sink.next(SubTaskTitle.builder()
                                            .stepNo(stepNo.get())
                                            .title(title)
                                            .property(ResponseStreamProperty.TITLE)
                                            .build());
                                    TaskStep taskStep = databaseService.getTaskStepByTitle(title);
                                    sink.next(SubTaskCode.builder()
                                            .stepNo(stepNo.get())
                                            .code(taskStep.getCode())
                                            .property(ResponseStreamProperty.CODE)
                                            .language(CodeLanguage.of(taskStep.getLanguage()))
                                            .build());
                                } else if (state.get() == 2) {
                                    String description = matcherParse(buffer, matcher.start());
                                    sink.next(SubTaskDescription.builder()
                                            .stepNo(stepNo.get())
                                            .description(description)
                                            .property(ResponseStreamProperty.DESCRIPTION)
                                            .build());
                                }
                                buffer.setLength(0);
                                stepNo.incrementAndGet();
                            }
                        }
                        buffer.append(data);
                    })
                    .doOnComplete(() -> {
                        if(state.get() == 3) {
                            sink.next(SubTaskWrap.builder()
                                    .stepNo(stepNo.get())
                                    .wrapper(buffer.toString().trim())
                                    .property(ResponseStreamProperty.OUTRO)
                                    .build());
                        }else{
                            sink.next(SubTaskWrap.builder()
                                    .stepNo(0)
                                    .wrapper(buffer.toString().trim())
                                    .property(ResponseStreamProperty.ERROR)
                                    .build());
                        }
                        sink.complete();
                    }).subscribe();
        });

    }

    @Override
    public String saveCode(TaskStep taskStep){
        try {
            //유효성 검사로 교체 예정
            if(taskStep.getCode().equals("")){
                return "not code";
            }else{
                databaseService.saveCode(taskStep);
                return "success";
            }
        }catch (Exception e){
            return e.toString();
        }
    }

    private String gingerParse(StringBuffer stringBuffer){
        return stringBuffer.substring(0, stringBuffer.indexOf("ginger")).trim();
    }

    private String matcherParse(StringBuffer stringBuffer, int m){
        return stringBuffer.substring(0, m).trim();
    }
}

