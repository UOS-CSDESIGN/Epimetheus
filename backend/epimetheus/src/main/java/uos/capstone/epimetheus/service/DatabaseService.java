package uos.capstone.epimetheus.service;

import uos.capstone.epimetheus.dtos.TaskStep;

public interface DatabaseService {
    TaskStep getTaskStepByTitle(String id);

    void saveCode(TaskStep taskStep);
}
