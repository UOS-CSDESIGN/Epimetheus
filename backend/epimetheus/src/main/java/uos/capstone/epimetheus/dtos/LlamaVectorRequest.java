package uos.capstone.epimetheus.dtos;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LlamaVectorRequest {

    private String input;

    @Builder
    public LlamaVectorRequest(String input) {
        this.input = input;
    }
}
