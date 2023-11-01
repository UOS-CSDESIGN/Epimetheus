package uos.capstone.epimetheus.adapter;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import uos.capstone.epimetheus.dtos.LlamaStepResponse;
import uos.capstone.epimetheus.dtos.LlamaVectorResponse;

public interface LlamaAdapter {
    Flux<LlamaStepResponse> getAllTaskSteps(String json);

    Mono<float[]> getVectorFromSentence(String sentence);
}
