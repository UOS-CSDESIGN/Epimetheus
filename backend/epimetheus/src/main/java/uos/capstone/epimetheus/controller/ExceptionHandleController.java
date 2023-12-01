package uos.capstone.epimetheus.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import org.springframework.web.bind.annotation.ExceptionHandler;
import uos.capstone.epimetheus.dtos.exception.IllegalArgumentException;
import uos.capstone.epimetheus.dtos.exception.InvalidDataException;

@RestControllerAdvice
public class ExceptionHandleController {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleEmptyDataException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.builder(e, HttpStatusCode.valueOf(400), e.getMessage())
                        .build());
    }

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<ErrorResponse> handleInvalidFileException(InvalidDataException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.builder(e, HttpStatusCode.valueOf(500), e.getMessage())
                        .build());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.builder(e, HttpStatusCode.valueOf(400), e.getMessage())
                        .build());
    }

}
