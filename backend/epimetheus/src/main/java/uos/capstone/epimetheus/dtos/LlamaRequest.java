package uos.capstone.epimetheus.dtos;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class LlamaRequest {

    private final List<LlamaRequestMessage> llamaRequestMessages;
    private final int temperature;
    private final int max_tokens;
    private final boolean stream;

    @Builder
    public LlamaRequest(List<LlamaRequestMessage> llamaRequestMessages, int temperature, int max_tokens, boolean stream) {
        this.llamaRequestMessages = llamaRequestMessages;
        this.temperature = temperature;
        this.max_tokens = max_tokens;
        this.stream = stream;
    }
}
