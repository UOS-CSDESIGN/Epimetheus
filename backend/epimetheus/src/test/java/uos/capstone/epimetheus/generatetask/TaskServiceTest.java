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

    private final ObjectMapper objectMapper = new ObjectMapper();
//    @Test
//    @DisplayName("Llama서비스에 SubTask생성요청과 DataBase에 저장")
//    void getSubTaskListInStream() throws Exception{
//        //given
//        //db에 주고 받는 값이랑 llama에 주고 받는 값 두개가 필요하다
//        String task = " ";
//
//        LlamaStepResponse response0 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"Intro: \"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response1 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"what \"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response2 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"are \"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response3 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"you \"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response4 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"doing?\"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response5 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"ginger\"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response6 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"Steps: \"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response7 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"!!1.\"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response8 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"title1\"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response9 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"ginger\"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response10 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"Descriptions:\"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response11 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"!!1.\"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response12 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"blabla\"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response13 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"ginger\"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response14 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"Outro:\"}}]}", LlamaStepResponse.class);
//        LlamaStepResponse response15 = objectMapper.readValue("{\"choices\":[{\"delta\":{\"content\": \"the end\"}}]}", LlamaStepResponse.class);
//
//
//
//        Flux<LlamaStepResponse> seq = Flux.just(
//                response0,
//                response1,
//                response2,
//                response3,
//                response4,
//                response5,
//                response6,
//                response7,
//                response8,
//                response9,
//                response10,
//                response11,
//                response12,
//                response13,
//                response14,
//                response15
//        );
//
//        given(llamaAdapter.getAllTaskSteps(task)).willReturn(seq);
//
//        //when
//        Flux<SubTaskResolver> result = taskSerivce.getSubTaskListInStream(task);
//        //then
//        StepVerifier.create(result)
//                .expectNextMatches(answer -> {
//                    if(answer instanceof SubTaskIntro){
//                        SubTaskIntro intro = (SubTaskIntro) answer;
//                        return intro.getStepNo() == 0 && intro.getProperty().equals("introduction") && intro.getWrapper().equals("what are you doing?");
//                    }
//                    return false;
//                })
//                .expectNextMatches(answer -> {
//                    if(answer instanceof SubTaskTitle){
//                        SubTaskTitle titlecheck = (SubTaskTitle) answer;
//                        return titlecheck.getStepNo() == 1 && titlecheck.getProperty().equals("title") && titlecheck.getTitle().equals("title1");
//                    }
//                    return false;
//                })
//                .expectNextMatches(answer -> {
//                    if(answer instanceof SubTaskCode){
//                        SubTaskCode code = (SubTaskCode) answer;
//                        return code.getStepNo() == 1 && code.getProperty().equals("code") && code.getCode().equals("import") && code.getLanguage().equals("default");
//                    }
//                    return false;
//                })
//                .expectNextMatches(answer -> {
//                    if(answer instanceof SubTaskDescription){
//                        SubTaskDescription description = (SubTaskDescription) answer;
//                        return description.getStepNo() == 1 && description.getProperty().equals("description") && description.getDescription().equals("blabla");
//                    }
//                    return false;
//                })
//                .expectNextMatches(answer -> {
//                    if(answer instanceof SubTaskOutro){
//                        SubTaskOutro outro = (SubTaskOutro) answer;
//                        return outro.getStepNo() == 0 && outro.getProperty().equals("conclusion") && outro.getWrapper().equals("the end");
//                    }
//                    return false;
//                })
//                .verifyComplete();
//    }

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
        taskSerivce.saveCode(step);
        //then
        verify(databaseService).saveCode(step);
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
