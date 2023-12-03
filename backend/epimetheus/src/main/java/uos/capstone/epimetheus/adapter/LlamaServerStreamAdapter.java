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
import reactor.core.publisher.Mono;
import uos.capstone.epimetheus.dtos.*;
import uos.capstone.epimetheus.dtos.exception.LlamaException;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
@RequiredArgsConstructor
@Log4j2
public class LlamaServerStreamAdapter implements LlamaAdapter {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    String errorMessage = "INTERNAL_SERVER_ERROR";

    @Value("${llama.generate.step}")
    String stepGenerateUrl;
    @Value("${llama.generate.vector}")
    String vectorGenerateUrl;
    @Value("${prompt.step}")
    Resource stepGeneratePrompt;
    @Value("${prompt.code}")
    Resource codeGeneratePrompt;

    private String stepGenerateRequestBodyBuilder(String task){
        Gson gson = new Gson();
        LlamaStepRequest request = LlamaStepRequest.builder()
                .max_tokens(2048)
                .temperature(0)
                .messages(List.of(
                        LlamaPromptRequestMessage.builder()
                                .content(readPrompt(stepGeneratePrompt))
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

    private String readPrompt(Resource prompt){
        try {
            InputStream inputStream = prompt.getInputStream();
            return new String(FileCopyUtils.copyToByteArray(inputStream));
        } catch (IOException e){
            log.error("Prompt read error in LlamaServerStreamAdapter.readPrompt");
            throw new LlamaException(errorMessage);
        }
    }

    @Override
    public Flux<LlamaStepResponse> getAllTaskSteps(String task){

          String body = stepGenerateRequestBodyBuilder(task);
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
                              return Flux.just(LlamaStepResponse.eof());
                          } else {
                              try {
                                  LlamaStepResponse llamaStepResponse = objectMapper.readValue(responseString, LlamaStepResponse.class);
                                  return Flux.just(llamaStepResponse);
                              } catch (JsonProcessingException e) {
                                  log.error("Error occurred to make Json in LlamaServerStreamAdapter.getAllTaskSteps");
                                  throw new LlamaException(errorMessage);
                              }
                          }
                      });

          }catch (WebClientResponseException e){
              log.error("Error occurred while running the WebClient in LlamaServerStreamAdapter.getAllTaskSteps");
              throw new LlamaException(errorMessage);
          }
    }

    @Override
    public Mono<double[]> getVectorFromSentence(String sentence) {
        String body = vectorGenerateRequestBodyBuilder(sentence);

        return webClient.post()
                .uri(vectorGenerateUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(body))
                .retrieve()
                .bodyToMono(LlamaVectorResponse.class)
                .map(LlamaVectorResponse::getVector);
    }


    private String vectorGenerateRequestBodyBuilder(String sentence) {
        Gson gson = new Gson();

        LlamaVectorRequest llamaVectorRequest = LlamaVectorRequest.builder()
                .input(sentence)
                .build();

        return gson.toJson(llamaVectorRequest);
    }

    @Override
    public Mono<String> getGeneratedCodeFromStep(String targetStep) {
        String body = codeGenerateRequestBodyBuilder(targetStep);

        return webClient.post()
                .uri(stepGenerateUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(body))
                .retrieve()
                .bodyToMono(LlamaStepResponse.class)
                .map(LlamaStepResponse::parseBlockContent)
                .map(StringBuilder::toString);
    }

    private String codeGenerateRequestBodyBuilder(String step){
        Gson gson = new Gson();
        LlamaStepRequest request = LlamaStepRequest.builder()
                .max_tokens(2048)
                .temperature(0)
                .messages(List.of(
                        LlamaPromptRequestMessage.builder()
                                .content(readPrompt(codeGeneratePrompt))
                                .role("system")
                                .build(),
                        LlamaPromptRequestMessage.builder()
                                .content(codeGenerateUserRequestContent(step))
                                .role("user")
                                .build()
                ))
                .build();

        return gson.toJson(request);
    }

    private String codeGenerateUserRequestContent(String step) {
        String prefix = "Please make a javascript code block of the following step. Step: ";

        return prefix + step;
    }
}
