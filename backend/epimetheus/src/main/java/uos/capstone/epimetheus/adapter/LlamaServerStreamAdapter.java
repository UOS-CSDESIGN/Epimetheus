package uos.capstone.epimetheus.adapter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Flux;
import uos.capstone.epimetheus.dtos.LlamaRequest;
import uos.capstone.epimetheus.dtos.LlamaResponse;
import uos.capstone.epimetheus.dtos.Message;


import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Component
@RequiredArgsConstructor
@Log4j2
public class LlamaServerStreamAdapter implements LlamaAdapter{

    private final WebClient webClient;
    private final ObjectMapper objectMapper;


    @Value("${llama.url}")
    String url;
    @Value("${prompt}")
    String prompt;



    private String createJson(String task){
        Gson gson = new Gson();
        LlamaRequest request = LlamaRequest.builder()
                .max_tokens(1024)
                .temperature(0)
                .messages(List.of(
                        Message.builder()
                                .content(readTextFile())
                                .role("system")
                                .build(),
                        Message.builder()
                                .content(task)
                                .role("user")
                                .build()
                ))
                .stream(true)
                .build();

        return gson.toJson(request);
    }

    private String readTextFile(){
        try {
            byte[] bytes = Files.readAllBytes(Paths.get(prompt));
            return new String(bytes, StandardCharsets.UTF_8);
        } catch (IOException e){
            log.error(e.getMessage());
            return "You are a helpful assistant.";
        }

    }

    @Override
    public Flux<LlamaResponse> fetchDataAsStream(String json){

          String body = createJson(json);
          try{
              return webClient.post()
                      .uri(url)
                      .contentType(MediaType.APPLICATION_JSON)
                      .body(BodyInserters.fromValue(body))
                      .retrieve()
                      .bodyToFlux(String.class)
                      .flatMap(responseString -> {
                          if ("[DONE]".equals(responseString.trim())) {
                              // Handle termination logic here if needed
                              return Flux.just(new LlamaResponse());  // or return a special termination object
                          } else {
                              try {
                                  LlamaResponse llamaResponse = objectMapper.readValue(responseString, LlamaResponse.class);
                                  return Flux.just(llamaResponse);
                              } catch (JsonProcessingException e) {
                                  return Flux.error(e);
                              }
                          }
                      });

              //TODO: 예외 응답 어떻게 처리해보기
          }catch (WebClientResponseException e){
              return Flux.error(e);
          }catch (Exception e){
              log.error(e.getMessage());
              return Flux.error(e);
          }

    }
}
