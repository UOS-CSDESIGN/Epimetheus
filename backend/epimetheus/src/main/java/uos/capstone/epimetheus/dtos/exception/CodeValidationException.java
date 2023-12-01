package uos.capstone.epimetheus.dtos.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import uos.capstone.epimetheus.adapter.CodeValidationResponse;

@Getter
public class CodeValidationException extends RuntimeException {

    HttpStatus statusCode;
    String message;

    public CodeValidationException(String message) {
        this.message = message;
        setStatusCode();
    }

    private void setStatusCode() {
        if(message.contains(CodeValidationResponse.CONNECTION_ERROR.getMessage())) {
            statusCode = HttpStatus.SERVICE_UNAVAILABLE;
        }
        else if(message.contains(CodeValidationResponse.RUNTIME.getMessage())) {
            statusCode = HttpStatus.BAD_REQUEST;
        }
        else if(message.contains(CodeValidationResponse.SYSTEM_ERROR.getMessage())) {
            statusCode = HttpStatus.SERVICE_UNAVAILABLE;
        }
        else if(message.contains(CodeValidationResponse.SYNTAX_ERROR.getMessage())) {
            statusCode = HttpStatus.BAD_REQUEST;
        }
        else {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
