package uos.capstone.epimetheus.config;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Component
@RequiredArgsConstructor
public class LlamaServerAdapter {

    private final WebClient webClient;


    public String sendRequest(String task) {
        String url = "http://esc.hcailab.uos.ac.kr/v1/chat/completions";

        // JSON 데이터
        String jsonData = "{"
                + "\"messages\": ["
                + "    { \"content\": \"You are a helpful assistant.\", \"role\": \"system\" },"
                + "    { \"content\": \"What is the capital of France?\", \"role\": \"user\" }"
                + "]"
                + "}";

        try {
            LlamaResponse response = webClient.post()
                    .uri(url)
                    .header("Content-Type", MediaType.APPLICATION_JSON_VALUE) // Setting the Content-Type header
                    .body(BodyInserters.fromValue(jsonData))
                    .retrieve()
                    .bodyToMono(LlamaResponse.class)
                    .block();

            return response.getChoices().get(0).getMessage().getContent();

        } catch (WebClientResponseException e) {
            // Handle the case where the server responds with an error status code
            // You can log the error or take any other appropriate action
            return "Error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString();
        } catch (Exception e) {
            // Handle any other exceptions
            return "An unexpected error occurred: " + e.getMessage();
        }
    }
}
