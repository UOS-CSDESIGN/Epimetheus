package uos.capstone.epimetheus.dtos;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LlamaPromptRequestMessage {

    private final String content;
    private final String role;

    @Builder
    public LlamaPromptRequestMessage(String content, String role) {
        this.content = content;
        this.role = role;
    }
}
