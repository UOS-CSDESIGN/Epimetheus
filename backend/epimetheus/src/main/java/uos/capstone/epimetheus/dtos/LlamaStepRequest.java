package uos.capstone.epimetheus.dtos;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class LlamaStepRequest {

    private final List<LlamaPromptRequestMessage> messages;
    private final int temperature;
    private final int max_tokens;
    private final boolean stream;

    @Builder
    public LlamaStepRequest(List<LlamaPromptRequestMessage> messages, int temperature, int max_tokens, boolean stream) {
        this.messages = messages;
        this.temperature = temperature;
        this.max_tokens = max_tokens;
        this.stream = stream;
    }
}
