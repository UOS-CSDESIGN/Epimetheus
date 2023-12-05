package uos.capstone.epimetheus.dtos.exception;

import lombok.Getter;

@Getter
public class EmptyDataException extends RuntimeException {
    String message;

    public EmptyDataException(String message) {
        this.message = message;
    }
}
