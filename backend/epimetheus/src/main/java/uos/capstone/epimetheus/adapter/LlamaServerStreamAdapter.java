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
import uos.capstone.epimetheus.dtos.LlamaRequest;
import uos.capstone.epimetheus.dtos.LlamaResponse;
import uos.capstone.epimetheus.dtos.LlamaRequestMessage;


import java.io.IOException;
import java.io.InputStream;
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
    Resource prompt;

    private String requestBodyBuilder(String task){
        Gson gson = new Gson();
        LlamaRequest request = LlamaRequest.builder()
                .max_tokens(1024)
                .temperature(0)
                .llamaRequestMessages(List.of(
                        LlamaRequestMessage.builder()
                                .content(readTextFile())
                                .role("system")
                                .build(),
                        LlamaRequestMessage.builder()
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
            InputStream inputStream = prompt.getInputStream();
            return new String(FileCopyUtils.copyToByteArray(inputStream));
        } catch (IOException e){
            log.error(e.getMessage());
            return "You are a helpful assistant.";
        }

    }

    @Override
    public Flux<LlamaResponse> fetchDataAsStream(String json){

          String body = requestBodyBuilder(json);
          try{
              return webClient.post()
                      .uri(url)
                      .contentType(MediaType.APPLICATION_JSON)
                      .body(BodyInserters.fromValue(body))
                      .retrieve()
                      .bodyToFlux(String.class)
                      .flatMap(responseString -> {
                          if ("[DONE]".equals(responseString.trim())) {
                              return Flux.just(new LlamaResponse());
                          } else {
                              try {
                                  LlamaResponse llamaResponse = objectMapper.readValue(responseString, LlamaResponse.class);
                                  return Flux.just(llamaResponse);
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
}
