package uos.capstone.epimetheus.dtos.exception;

import lombok.Getter;

@Getter
public class LlamaException extends RuntimeException {
    String message;

    public LlamaException(String message) {
        this.message = message;
    }
}
