package uos.capstone.epimetheus.service;

import reactor.core.publisher.Mono;
import uos.capstone.epimetheus.dtos.TaskStep;

public interface SimilarityService {
    Mono<TaskStep> getSimilarStep(String step);
}
