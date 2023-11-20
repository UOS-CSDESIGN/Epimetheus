package uos.capstone.epimetheus.service;

import uos.capstone.epimetheus.dtos.TaskStep;

public interface TaskExecuteService {
    String executeSubTask(TaskStep taskStep);
}
