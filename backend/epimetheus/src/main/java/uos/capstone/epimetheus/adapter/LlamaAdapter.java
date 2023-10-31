package uos.capstone.epimetheus.adapter;

import reactor.core.publisher.Flux;
import uos.capstone.epimetheus.dtos.LlamaStepResponse;
import uos.capstone.epimetheus.dtos.LlamaVectorResponse;

public interface LlamaAdapter {
    Flux<LlamaStepResponse> getAllTaskSteps(String json);

    LlamaVectorResponse getVectorFromSentence(String sentence);
}
