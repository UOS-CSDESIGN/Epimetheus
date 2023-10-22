package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import uos.capstone.epimetheus.dtos.TaskStep;
import uos.capstone.epimetheus.repository.MongoDBRepository;

@Service
@RequiredArgsConstructor
@Log4j2
public class MongoDBServiceImpl implements DatabaseService {
    private final MongoDBRepository mongoRepository;

    @Override
    public TaskStep getTaskStepByTitle(String id){
        return mongoRepository.findById(id).orElse(mongoRepository.save(TaskStep.of(id)));
    }

}
