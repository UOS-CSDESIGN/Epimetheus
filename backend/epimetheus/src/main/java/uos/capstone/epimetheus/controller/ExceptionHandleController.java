package uos.capstone.epimetheus.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import org.springframework.web.bind.annotation.ExceptionHandler;
import uos.capstone.epimetheus.dtos.exception.CodeValidationException;
import uos.capstone.epimetheus.dtos.exception.EmptyDataException;
import uos.capstone.epimetheus.dtos.exception.InvalidDataException;
import uos.capstone.epimetheus.dtos.exception.LlamaException;

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

    @ExceptionHandler(LlamaException.class)
    public ResponseEntity<ErrorResponse> handleLlamaException(LlamaException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.builder(e, HttpStatusCode.valueOf(500), e.getMessage())
                        .build());
    }

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<ErrorResponse> handleInvalidDataException(InvalidDataException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.builder(e, HttpStatusCode.valueOf(400), e.getMessage())
                        .build());
    }

    @ExceptionHandler(EmptyDataException.class)
    public ResponseEntity<ErrorResponse> handleEmptyDataException(EmptyDataException e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.builder(e, HttpStatusCode.valueOf(500), e.getMessage())
                        .build());
    }
}
