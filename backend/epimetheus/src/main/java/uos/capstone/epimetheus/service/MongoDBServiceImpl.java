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
    public TaskStep getTaskStepByTitle(String id){
        return mongoRepository.findById(id).orElse(mongoRepository.save(TaskStep.of(id)));
    }

    @Override
    public void saveCode(TaskStep taskStep){
        mongoRepository.save(taskStep);
    }

    @Override
    public List<TaskStep> getAllData() {
        return mongoRepository.findAll();
    }

}
