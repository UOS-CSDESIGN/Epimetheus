package uos.capstone.epimetheus.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import uos.capstone.epimetheus.dtos.TaskStep;
import uos.capstone.epimetheus.dtos.llamaTasks.SubTaskCode;
import uos.capstone.epimetheus.dtos.llamaTasks.SubTaskResolver;
import uos.capstone.epimetheus.service.TaskExecuteService;
import uos.capstone.epimetheus.service.TaskSerivce;


@RestController
@RequiredArgsConstructor
@Log4j2
public class TaskController {

    private final TaskSerivce taskSerivce;
    private final TaskExecuteService taskExecuteService;

    @GetMapping(path = "/tasks", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<SubTaskResolver> getTask(@RequestParam String task) {
        log.info("[/tasks] Task : " + task);
        return taskSerivce.getSubTaskListInStream(task);
    }

    @PostMapping(path = "/save")
    public String saveCode(@RequestBody TaskStep taskStep) {
        log.info("[/save] Save Code : " + taskStep);
        return taskSerivce.saveCode(taskStep);
    }

    @GetMapping("/code")
    public SubTaskCode getSimilar(@RequestParam String input) {
        log.info("[/code] Similar Task Input : " + input);
        return taskSerivce.getSimilarCode(input);
    }

    @PostMapping("/execute")
    public void executeService(@RequestBody String code){
        taskExecuteService.executeSubTask(code);
    }
}

