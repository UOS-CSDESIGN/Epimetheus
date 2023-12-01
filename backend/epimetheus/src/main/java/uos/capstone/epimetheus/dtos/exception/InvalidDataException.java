package uos.capstone.epimetheus.dtos.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class InvalidDataException extends RuntimeException {
    private final String error;
}
