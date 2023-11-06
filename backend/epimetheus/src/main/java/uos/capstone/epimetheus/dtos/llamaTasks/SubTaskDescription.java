package uos.capstone.epimetheus.dtos.llamaTasks;

import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.Objects;

@NoArgsConstructor
public class SubTaskDescription implements SubTaskResolver {
    @Override
    public int hashCode() {
        return Objects.hash(stepId, description, property);
    }

    int stepId;
    String description;
    ResponseStreamProperty property;

    @Builder
    public SubTaskDescription(int stepId, String description, ResponseStreamProperty property) {
        this.stepId = stepId;
        this.description = description;
        this.property = property;
    }

    @Override
    public int getStepId() {
        return stepId;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String getProperty() {
        return property.getProperty();
    }
}
