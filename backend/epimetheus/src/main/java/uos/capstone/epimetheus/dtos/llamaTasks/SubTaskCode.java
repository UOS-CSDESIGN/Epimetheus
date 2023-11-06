package uos.capstone.epimetheus.dtos.llamaTasks;

import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class SubTaskCode implements SubTaskResolver {

    int stepId;
    String code;
    ResponseStreamProperty property;
    CodeLanguage language;


    @Builder
    public SubTaskCode(int stepId, String code, ResponseStreamProperty property, CodeLanguage language) {
        this.stepId = stepId;
        this.code = code;
        this.property = property;
        this.language = language;
    }

    @Override
    public int getStepId() {
        return stepId;
    }

    @Override
    public String getProperty() {
        return property.getProperty();
    }

    public String getLanguage() {
        return language.getLanguage();
    }

    public String getCode() {
        return code;
    }
