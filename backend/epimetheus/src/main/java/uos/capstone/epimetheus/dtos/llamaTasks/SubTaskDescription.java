package uos.capstone.epimetheus.dtos.llamaTasks;

import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class SubTaskDescription implements SubTaskResolver {
    int stepNo;
    String description;
    ResponseStreamProperty property;

    @Builder
    public SubTaskDescription(int stepNo, String description, ResponseStreamProperty property) {
        this.stepNo = stepNo;
        this.description = description;
        this.property = property;
    }

    @Override
    public int getStepNo() {
        return stepNo;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String getProperty() {
        return property.getProperty();
    }
}
