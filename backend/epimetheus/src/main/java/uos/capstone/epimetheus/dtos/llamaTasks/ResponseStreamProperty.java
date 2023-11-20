package uos.capstone.epimetheus.dtos.llamaTasks;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum ResponseStreamProperty {

    TITLE("title"),
    DESCRIPTION("description"),
    CODE("code"),
    INTRO("introduction"),
    OUTRO("conclusion"),
    ERROR("error");

    private final String property;

    ResponseStreamProperty(String property) {
        this.property = property;
    }

    @JsonValue
    public String toValue() {
        return getProperty();
    }
}
