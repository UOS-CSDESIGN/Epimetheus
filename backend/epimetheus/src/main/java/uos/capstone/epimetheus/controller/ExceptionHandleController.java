package uos.capstone.epimetheus.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import org.springframework.web.bind.annotation.ExceptionHandler;
import uos.capstone.epimetheus.dtos.exception.CodeValidationException;

@RestControllerAdvice
public class ExceptionHandleController {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.builder(e, HttpStatusCode.valueOf(500), e.getMessage())
                        .build());
    }

    @ExceptionHandler(CodeValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(CodeValidationException e) {
        return ResponseEntity.status(e.getStatusCode())
                .body(ErrorResponse.builder(e, HttpStatusCode.valueOf(e.getStatusCode().value()), e.getMessage())
                        .build());
    }

}
