package uos.capstone.epimetheus.adapter;

import reactor.core.publisher.Flux;
import uos.capstone.epimetheus.dtos.LlamaResponse;

public interface LlamaAdapter {
    public Flux<LlamaResponse> fetchDataAsStream(String json);
}
