package uos.capstone.epimetheus.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import uos.capstone.epimetheus.dtos.TaskStep;

public interface MongoDBRepository extends MongoRepository<TaskStep, String> {
}
