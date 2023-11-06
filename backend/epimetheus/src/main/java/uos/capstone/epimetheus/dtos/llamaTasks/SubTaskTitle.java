package uos.capstone.epimetheus.dtos.llamaTasks;

import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.Objects;

@NoArgsConstructor
public class SubTaskTitle implements SubTaskResolver {
    @Override
    public int hashCode() {
        return Objects.hash(stepId, title, property);
    }

    int stepId;
    String title;
    ResponseStreamProperty property;

    @Builder
    public SubTaskTitle(int stepId, String title, ResponseStreamProperty property) {
        this.stepId = stepId;
        this.title = title;
        this.property = property;
    }

    @Override
    public int getStepId() {
        return stepId;
    }

    public String getTitle() {
        return title;
    }

    @Override
    public String getProperty() {
        return property.getProperty();
    }
}
