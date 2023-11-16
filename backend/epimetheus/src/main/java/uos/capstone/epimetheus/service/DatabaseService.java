package uos.capstone.epimetheus.service;

import uos.capstone.epimetheus.dtos.TaskStep;

import java.util.List;

public interface DatabaseService {

    TaskStep saveByTitle(String step, double[] vector);

    void updateCode(TaskStep taskStep);

    List<TaskStep> getAllData();
}
