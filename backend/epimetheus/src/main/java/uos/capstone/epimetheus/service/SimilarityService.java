package uos.capstone.epimetheus.service;

import uos.capstone.epimetheus.dtos.TaskStep;

public interface SimilarityService {
    TaskStep getSimilarStep(String step);
}
