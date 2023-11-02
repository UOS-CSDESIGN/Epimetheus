package uos.capstone.epimetheus.dtos;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LlamaRequestMessage {

    private final String content;
    private final String role;

    @Builder
    public LlamaRequestMessage(String content, String role) {
        this.content = content;
        this.role = role;
    }
}
