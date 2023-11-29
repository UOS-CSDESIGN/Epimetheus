package uos.capstone.epimetheus.adapter;

public enum CodeValidationResponse {
    SUCCESS("[SUCCESS]"),
    CONNECTION_ERROR("[CONNECTION ERROR]"),
    SYNTAX_ERROR("[SYNTAX ERROR]"),
    RUNTIME("[RUNTIME]"),
    SYSTEM_ERROR("[SYSTEM ERROR]");

    private String message;

    CodeValidationResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
