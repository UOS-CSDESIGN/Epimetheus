package uos.capstone.epimetheus.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import uos.capstone.epimetheus.dtos.TaskStep;

import java.io.*;
import java.net.Socket;

@RequiredArgsConstructor
@Log4j2
@Service
public class TaskExecuteServiceImpl implements TaskExecuteService{

    private final WebClient webClient;

    @Value("${react.validate.uri}")
    String validationUrl;

    @Override
    public String executeSubTask(TaskStep taskStep){
        String output = webClient.post()
                .uri(validationUrl)
                .contentType(MediaType.TEXT_PLAIN)
                .body(BodyInserters.fromValue(taskStep.getCode()))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return output;
    }
}
