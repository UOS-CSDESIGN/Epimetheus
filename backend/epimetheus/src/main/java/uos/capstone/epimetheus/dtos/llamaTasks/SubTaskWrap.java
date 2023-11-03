package uos.capstone.epimetheus.dtos.llamaTasks;

import lombok.Builder;

public class SubTaskWrap implements SubTaskResolver {

    int stepNo;
    String wrapper;
    ResponseStreamProperty property;

    @Builder
    public SubTaskWrap(int stepNo, String wrapper, ResponseStreamProperty property) {
        this.stepNo = stepNo;
        this.wrapper = wrapper;
        this.property = property;
    }

    @Override
    public int getStepId() {
        return stepNo;
    }

    public String getWrapper() {
        return wrapper;
    }

    @Override
    public String getProperty() {
        return property.getProperty();
    }
}
