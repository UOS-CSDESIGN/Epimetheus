package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.publisher.Mono;
import reactor.core.publisher.SignalType;
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

    private final String stopWord = "ginger";

    @Override
    public Flux<SubTaskResolver> getSubTaskListInStream(String task) {
        StringBuffer buffer = new StringBuffer();
        AtomicInteger state = new AtomicInteger(-1);
        AtomicInteger stepNo = new AtomicInteger(0);

        StringBuffer intro = new StringBuffer();
        Pattern pattern = Pattern.compile("!!(\\d+)\\.");

        return llamaAdapter.getAllTaskSteps(task).flatMap(llamaStepResponse -> {
            Flux<SubTaskResolver> subTask = Flux.empty();
            StringBuilder data = llamaStepResponse.parseContent();
            Matcher stepMatcher = stepPattern.matcher(buffer);
            Matcher descriptionMatcher = descriptionPattern.matcher(buffer);

        return llamaAdapter.getAllTaskSteps(task).handle((llamaStepResponse, sink) -> {
                    String data = llamaStepResponse.parseContent();
                    Matcher matcher = pattern.matcher(buffer);
                    boolean patternFound = matcher.find();
                    if (buffer.indexOf("Intro:") != -1 || patternFound && state.get() == 0) {
                        state.set(0);
                        buffer.setLength(0);
                    } else if (buffer.indexOf("Outro:") != -1) {
                        state.set(3);
                        buffer.setLength(0);
                        stepNo.set(0);
                    } else if (data.equals("[DONE]")) {
                        sink.next(SubTaskWrap.builder()
                                .stepNo(0)
                                .wrapper(endOfFluxParse(buffer))
                                .property(ResponseStreamProperty.OUTRO)
                                .build());
                    } else if (buffer.indexOf(stopWord) == -1 && !patternFound) {
                    } else {
                        boolean type = buffer.indexOf(stopWord) != -1;
                        String content = type ? stopWordParse(buffer) : matcherParse(buffer, matcher.start());
                        switch (state.get()) {
                            case 0:
                                intro.append(content);
                                buffer.setLength(0);
                                sink.next(SubTaskWrap.builder()
                                        .stepNo(0)
                                        .wrapper(content)
                                        .property(ResponseStreamProperty.INTRO)
                                        .build());
                                break;
                            case 1:
                                if(stepNo.get() == 0)
                                    break;
                                sink.next(SubTaskTitle.builder()
                                        .stepNo(stepNo.get())
                                        .title(content)
                                        .property(ResponseStreamProperty.TITLE)
                                        .build());
                                similarityService.getSimilarStep(content).subscribe(taskStep -> sink.next((SubTaskCode.builder()
                                        .stepNo(stepNo.get())
                                        .code(taskStep.getCode())
                                        .property(ResponseStreamProperty.CODE)
                                        .language(CodeLanguage.of(taskStep.getLanguage()))
                                        .build()
                                )));
                                break;
                            case 2:
                                if(stepNo.get() == 0)
                                    break;
                                sink.next(SubTaskDescription.builder()
                                        .stepNo(stepNo.get())
                                        .description(content)
                                        .property(ResponseStreamProperty.DESCRIPTION)
                                        .build());
                                break;
                            default:
                                sink.error(new RuntimeException("Invalid Prompt"));
                        }

                        if (type) {
                            stepNo.set(0);
                            state.incrementAndGet();
                        }
                        else  {
                            stepNo.incrementAndGet();
                        }
                        buffer.setLength(0);
                    }
                    buffer.append(data);
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

    private String stopWordParse(StringBuffer stringBuffer){
        return stringBuffer.substring(0, stringBuffer.indexOf("ginger")).trim();
    }

    private String endOfFluxParse(StringBuffer stringBuffer){
        return stringBuffer.toString().trim();
    }

    private String matcherParse(StringBuffer stringBuffer, int m){
        return stringBuffer.substring(0, m).trim();
    }
}

