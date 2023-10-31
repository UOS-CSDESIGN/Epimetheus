package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
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
public class TaskServiceStreamImpl implements TaskSerivce{

    private final LlamaAdapter llamaAdapter;

    private final DatabaseService databaseService;

    @Override
    public Flux<SubTaskResolver> getSubTaskListInStream(String task) {
        StringBuffer buffer = new StringBuffer();
        AtomicInteger state = new AtomicInteger(0);
        AtomicInteger stepNo = new AtomicInteger(0);

        StringBuffer intro = new StringBuffer();
        Pattern pattern = Pattern.compile("!!(\\d+)\\.");


        return Flux.create(sink -> {
            llamaAdapter.getAllTaskSteps(task)
                    .map(LlamaStepResponse::parseContent)
                    .doOnNext(data -> {

                        if (buffer.indexOf("Intro:") != -1) {
                            state.set(0);
                            buffer.setLength(0);
                        }
                        else if (buffer.indexOf("ginger") != -1) {
                            if(state.get() == 0) {
                                intro.append(gingerParse(buffer));
                                buffer.setLength(0);
                                sink.next(SubTaskWrap.builder()
                                        .stepNo(0)
                                        .wrapper(intro.toString())
                                        .property(ResponseStreamProperty.INTRO)
                                        .build());
                            }
                            else if (state.get() == 1) {
                                String title = gingerParse(buffer);
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
                                String description = gingerParse(buffer);
                                sink.next(SubTaskDescription.builder()
                                        .stepNo(stepNo.get())
                                        .description(description)
                                        .property(ResponseStreamProperty.DESCRIPTION)
                                        .build());
                            }
                            stepNo.set(0);
                            buffer.setLength(0);
                            state.incrementAndGet();
                        }
                        else if (buffer.indexOf("Outro:") != -1) {
                            state.set(3);
                            buffer.setLength(0);
                            stepNo.set(0);
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

