package uos.capstone.epimetheus.dtos.exception;

import lombok.Getter;

@Getter
public class InvalidDataException extends RuntimeException {
    String message;

    public InvalidDataException(String message) {
        this.message = message;
    }
}
