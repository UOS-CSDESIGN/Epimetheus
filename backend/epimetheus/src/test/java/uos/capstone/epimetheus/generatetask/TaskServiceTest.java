package uos.capstone.epimetheus.generatetask;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.SoftAssertions;
import org.assertj.core.api.junit.jupiter.InjectSoftAssertions;
import org.assertj.core.api.junit.jupiter.SoftAssertionsExtension;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;
import uos.capstone.epimetheus.adapter.LlamaAdapter;
import uos.capstone.epimetheus.dtos.LlamaStepResponse;
import uos.capstone.epimetheus.dtos.TaskStep;
import uos.capstone.epimetheus.dtos.llamaTasks.*;
import uos.capstone.epimetheus.service.DatabaseService;
import uos.capstone.epimetheus.service.SimilarityService;
import uos.capstone.epimetheus.service.TaskSerivce;
import uos.capstone.epimetheus.service.TaskServiceStreamImpl;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith({MockitoExtension.class, SoftAssertionsExtension.class})
@DisplayName("UnitTest: TaskService")
public class TaskServiceTest {
    @InjectSoftAssertions
    private SoftAssertions softAssertions;

    @InjectMocks
    private TaskServiceStreamImpl taskSerivce;

    @Mock
    private LlamaAdapter llamaAdapter;

    @Mock
    private DatabaseService databaseService;

    @Mock
    private SimilarityService similarityService;


    @Test
    @DisplayName("saveCode메소드 테스트")
    void saveCode(){
        //given
        TaskStep step = TaskStep.builder()
                .title("you can do it")
                .language(CodeLanguage.DEFAULT)
                .code("import")
                .build();

        //when
        softAssertions.assertThat(taskSerivce.saveCode(step)).isEqualTo("success");
        //then
    }

    @Test
    @DisplayName("getSimilarCode메소드 테스트")
    void getSimilarCode(){
        //given
        String title = "Asd";
        TaskStep step = TaskStep.builder()
                        .title("Asd")
                        .code("import")
                        .language(CodeLanguage.DEFAULT)
                        .build();

        given(similarityService.getSimilarStep(title)).willReturn(step);
        //when
        SubTaskCode subTaskCode = taskSerivce.getSimilarCode(title);

        //then
        softAssertions.assertThat(subTaskCode.getCode()).isEqualTo("import");
        softAssertions.assertThat(subTaskCode.getProperty()).isEqualTo("code");
        softAssertions.assertThat(subTaskCode.getLanguage()).isEqualTo("default");
    }

}
