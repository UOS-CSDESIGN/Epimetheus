package uos.capstone.epimetheus.service;

import uos.capstone.epimetheus.dtos.TaskStep;

import java.util.List;

public interface DatabaseService {
    TaskStep getTaskStepByTitle(String id);

    void saveCode(TaskStep taskStep);
}
