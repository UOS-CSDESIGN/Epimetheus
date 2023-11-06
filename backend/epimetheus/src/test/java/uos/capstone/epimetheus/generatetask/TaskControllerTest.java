package uos.capstone.epimetheus.generatetask;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.FluxExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.servlet.MockMvc;
import reactor.core.publisher.Flux;

import reactor.test.StepVerifier;
import uos.capstone.epimetheus.controller.TaskController;
import uos.capstone.epimetheus.dtos.llamaTasks.*;
import uos.capstone.epimetheus.service.TaskSerivce;

import static org.mockito.BDDMockito.given;


@DisplayName("UnitTest: TaskController")
@WebMvcTest(TaskController.class)
public class TaskControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private TaskSerivce taskSerivce;

    @Autowired
    TaskController taskController = new TaskController(taskSerivce);

    @Test
    @DisplayName("Task를 받아 subTask를 생성하는 API")
    void getSubTask() throws Exception{
        //given
        String task = "value";
        WebTestClient webTestClient = WebTestClient.bindToController(taskController).build();


        Flux<SubTaskResolver> seq1 = Flux.just(
                SubTaskIntro.builder()
                        .stepId(0)
                        .property(ResponseStreamProperty.INTRO)
                        .wrapper("intro")
                        .build(),
                SubTaskTitle.builder()
                        .stepId(1)
                        .property(ResponseStreamProperty.TITLE)
                        .title("you make them")
                        .build(),
                SubTaskCode.builder()
                        .stepId(1)
                        .property(ResponseStreamProperty.CODE)
                        .code("import")
                        .language(CodeLanguage.JAVA)
                        .build(),
                SubTaskOutro.builder()
                        .stepId(0)
                        .property(ResponseStreamProperty.OUTRO)
                        .wrapper("outro")
                        .build()
        );

        given(taskSerivce.getSubTaskListInStream(task)).willReturn(seq1);

        //when
        FluxExchangeResult<String> result = webTestClient.get()
                .uri(uriBuilder -> uriBuilder.path("/tasks")
                        .queryParam("task", task)
                        .build())
                .exchange()
                .returnResult(String.class);

        Flux<String> responseFlux = result.getResponseBody();
        Flux<SubTaskResolver> subTaskResolverFlux = responseFlux.map(this::convertToSubTaskResolver);


        //then
        StepVerifier.create(subTaskResolverFlux)
                .expectNextMatches(answer -> {
                    if(answer instanceof SubTaskIntro){
                        SubTaskIntro intro = (SubTaskIntro) answer;
                        return intro.getStepId() == 0 && intro.getProperty().equals("introduction") && intro.getWrapper().equals("intro");
                    }
                    return false;
                })
                .expectNextMatches(answer -> {
                    if(answer instanceof SubTaskTitle){
                        SubTaskTitle title = (SubTaskTitle) answer;
                        return title.getStepId() == 1 && title.getProperty().equals("title") && title.getTitle().equals("you make them");
                    }
                    return false;
                })
                .expectNextMatches(answer -> {
                    if(answer instanceof SubTaskCode){
                        SubTaskCode code = (SubTaskCode) answer;
                        return code.getStepId() == 1 && code.getProperty().equals("code") && code.getCode().equals("import") && code.getLanguage().equals("java");
                    }
                    return false;
                })
                .expectNextMatches(answer -> {
                    if(answer instanceof SubTaskOutro){
                        SubTaskOutro outro = (SubTaskOutro) answer;
                        return outro.getStepId() == 0 && outro.getProperty().equals("conclusion") && outro.getWrapper().equals("outro");
                    }
                    return false;
                })
                .verifyComplete();

    }


    private SubTaskResolver convertToSubTaskResolver(String json) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode node = mapper.readTree(json);
            String type = node.get("property").asText();

            switch (type) {
                case "introduction":
                    return mapper.treeToValue(node, SubTaskIntro.class);
                case "title":
                    return mapper.treeToValue(node, SubTaskTitle.class);
                case "code":
                    return mapper.treeToValue(node, SubTaskCode.class);
                case "conclusion":
                    return mapper.treeToValue(node, SubTaskOutro.class);
                default:
                    throw new IllegalArgumentException("Unknown type: " + type);
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}

