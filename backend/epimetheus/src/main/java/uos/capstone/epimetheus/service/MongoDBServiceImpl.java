package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import uos.capstone.epimetheus.adapter.LlamaAdapter;
import uos.capstone.epimetheus.dtos.TaskStep;
import uos.capstone.epimetheus.dtos.llamaTasks.CodeLanguage;
import uos.capstone.epimetheus.repository.MongoDBRepository;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class MongoDBServiceImpl implements DatabaseService {

    private final MongoDBRepository mongoRepository;
    private final LlamaAdapter llamaAdapter;

    @Override
    public TaskStep saveByTitle(String step, double[] vector) {
        String code = llamaAdapter.getGeneratedCodeFromStep(step).block();

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
        mongoRepository.save(taskStep);
    }

    @Override
    public List<TaskStep> getAllData() {
        return mongoRepository.findAll();
    }

}
