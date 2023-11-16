package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import uos.capstone.epimetheus.adapter.LlamaAdapter;
import uos.capstone.epimetheus.dtos.TaskStep;
import uos.capstone.epimetheus.dtos.llamaTasks.CodeLanguage;
import uos.capstone.epimetheus.repository.MongoDBRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class MongoDBServiceImpl implements DatabaseService {

    private final MongoDBRepository mongoRepository;
    private final LlamaAdapter llamaAdapter;

    @Override
    public TaskStep saveByTitle(String step, double[] vector) {
        String code = llamaAdapter.getGeneratedCodeFromStep(step).block();
        code = code.substring(code.indexOf("```") + 3, code.lastIndexOf("```"));

        TaskStep newStep = TaskStep.builder()
                .title(step)
                .code(code)
                .values(vector)
                .language(CodeLanguage.JAVASCRIPT)
                .build();
        return mongoRepository.save(newStep);
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
