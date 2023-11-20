package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import uos.capstone.epimetheus.dtos.TaskStep;
import uos.capstone.epimetheus.repository.MongoDBRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class MongoDBServiceImpl implements DatabaseService {
    private final MongoDBRepository mongoRepository;

    @Override
    public TaskStep saveByTitle(String step, double[] vector) {
        return mongoRepository.save(TaskStep.of(step, vector));
    }

    @Override
    public void updateCode(TaskStep taskStep){
        TaskStep stepToUpdate = mongoRepository.findById(taskStep.getTitle()).orElseThrow(() -> new RuntimeException("Trying to modify undefined step."));
        stepToUpdate.setCode(taskStep.getCode());

        mongoRepository.save(stepToUpdate);
    }

    @Override
    public List<TaskStep> getAllData() {
        return mongoRepository.findAll();
    }

}
