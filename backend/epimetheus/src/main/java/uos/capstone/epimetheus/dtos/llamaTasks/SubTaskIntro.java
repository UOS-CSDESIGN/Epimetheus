package uos.capstone.epimetheus.dtos.llamaTasks;

import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.Objects;

@NoArgsConstructor
public class SubTaskIntro implements SubTaskResolver {
    @Override
    public int hashCode() {
        return Objects.hash(stepId, wrapper, property);
    }

    int stepId;
    String wrapper;
    ResponseStreamProperty property;

    @Builder
    public SubTaskIntro(int stepId, String wrapper, ResponseStreamProperty property) {
        this.stepId = stepId;
        this.wrapper = wrapper;
        this.property = property;
    }

    @Override
    public int getStepId() {
        return stepId;
    }

    public String getWrapper() {
        return wrapper;
    }

    @Override
    public String getProperty() {
        return property.getProperty();
    }
}
