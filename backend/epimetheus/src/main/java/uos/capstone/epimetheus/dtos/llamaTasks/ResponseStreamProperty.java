package uos.capstone.epimetheus.dtos.llamaTasks;

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


}
