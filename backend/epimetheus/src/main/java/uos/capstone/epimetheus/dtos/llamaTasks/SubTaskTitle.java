package uos.capstone.epimetheus.dtos.llamaTasks;

import lombok.Builder;

public class SubTaskTitle implements SubTaskResolver {

    int stepNo;
    String title;
    ResponseStreamProperty property;

    @Builder
    public SubTaskTitle(int stepNo, String title, ResponseStreamProperty property) {
        this.stepNo = stepNo;
        this.title = title;
        this.property = property;
    }

    @Override
    public int getStepId() {
        return stepNo;
    }

    public String getTitle() {
        return title;
    }

    @Override
    public String getProperty() {
        return property.getProperty();
    }
}
