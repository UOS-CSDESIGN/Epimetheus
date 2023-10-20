package uos.capstone.epimetheus.dtos.llamaTasks;

import lombok.Builder;

public class SubTaskCode implements SubTaskResolver {

    int stepNo;
    String code;
    ResponseStreamProperty property;
    CodeLanguage language;


    @Builder
    public SubTaskCode(int stepNo, String code, ResponseStreamProperty property, CodeLanguage language) {
        this.stepNo = stepNo;
        this.code = code;
        this.property = property;
        this.language = language;
    }

    @Override
    public int getStepId() {
        return stepNo;
    }

    @Override
    public String getProperty() {
        return property.getProperty();
    }

    public String getLanguage() {
        return language.getLanguage();
    }
}
