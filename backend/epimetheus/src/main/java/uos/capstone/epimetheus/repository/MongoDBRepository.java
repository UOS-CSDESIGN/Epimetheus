package uos.capstone.epimetheus.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import uos.capstone.epimetheus.dtos.TaskStep;

import java.util.List;

public interface MongoDBRepository extends MongoRepository<TaskStep, String> {
}
