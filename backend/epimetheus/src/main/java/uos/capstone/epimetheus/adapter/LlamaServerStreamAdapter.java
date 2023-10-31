package uos.capstone.epimetheus.adapter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Flux;
import uos.capstone.epimetheus.dtos.LlamaStepRequest;
import uos.capstone.epimetheus.dtos.LlamaStepResponse;
import uos.capstone.epimetheus.dtos.LlamaPromptRequestMessage;
import uos.capstone.epimetheus.dtos.LlamaVectorResponse;


import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
@RequiredArgsConstructor
@Log4j2
public class LlamaServerStreamAdapter implements LlamaAdapter{

    private final WebClient webClient;
    private final ObjectMapper objectMapper;


    @Value("${llama.generate.step}")
    String stepGenerateUrl;
    @Value("${llama.generate.vector}")
    String vectorGenerateUrl;
    @Value("${prompt}")
    Resource prompt;

    private String stepGenerateRequestBodyBuilder(String task){
        Gson gson = new Gson();
        LlamaStepRequest request = LlamaStepRequest.builder()
                .max_tokens(1024)
                .temperature(0)
                .messages(List.of(
                        LlamaPromptRequestMessage.builder()
                                .content(readPrompt())
                                .role("system")
                                .build(),
                        LlamaPromptRequestMessage.builder()
                                .content(task)
                                .role("user")
                                .build()
                ))
                .stream(true)
                .build();

        return gson.toJson(request);
    }

    private String readPrompt(){
        try {
            InputStream inputStream = prompt.getInputStream();
            return new String(FileCopyUtils.copyToByteArray(inputStream));
        } catch (IOException e){
            log.error(e.getMessage());
            return "You are a helpful assistant.";
        }

    }

    @Override
    public Flux<LlamaStepResponse> getAllTaskSteps(String json){

          String body = stepGenerateRequestBodyBuilder(json);
          try{
              log.info("Step Generate Request to Llama with task: " + task);
              return webClient.post()
                      .uri(stepGenerateUrl)
                      .contentType(MediaType.APPLICATION_JSON)
                      .body(BodyInserters.fromValue(body))
                      .retrieve()
                      .bodyToFlux(String.class)
                      .doOnError(e -> log.info("Error occurred while making web request", e))
                      .flatMap(responseString -> {
                          if ("[DONE]".equals(responseString.trim())) {
                              return Flux.just(new LlamaStepResponse());
                          } else {
                              try {
                                  LlamaStepResponse llamaStepResponse = objectMapper.readValue(responseString, LlamaStepResponse.class);
                                  return Flux.just(llamaStepResponse);
                              } catch (JsonProcessingException e) {
                                  return Flux.error(e);
                              }
                          }
                      });

          }catch (WebClientResponseException e){
              return Flux.error(e);
          }catch (Exception e){
              log.error(e.getMessage());
              return Flux.error(e);
          }

    }

    @Override
    public LlamaVectorResponse getVectorFromSentence(String sentence) {
        return null;
    }
}
