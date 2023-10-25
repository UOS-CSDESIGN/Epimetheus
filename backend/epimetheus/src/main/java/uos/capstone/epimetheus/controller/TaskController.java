package uos.capstone.epimetheus.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import uos.capstone.epimetheus.dtos.TaskStep;
import uos.capstone.epimetheus.dtos.llamaTasks.SubTaskResolver;
import uos.capstone.epimetheus.service.TaskSerivce;


@RestController
@RequiredArgsConstructor
@Log4j2
public class TaskController {

    private final TaskSerivce taskSerivce;

    @PostMapping(path = "/tasks", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<SubTaskResolver> getTaskData(@RequestBody String taskName) {
        log.info(taskName);
        return taskSerivce.getSubTaskListInStream(taskName);
    }

    @PostMapping(path = "/save")
    public ResponseEntity<String> saveCode(@RequestBody TaskStep taskStep) {
        log.info("[/save] Save Code - " + taskStep);
        String response = taskSerivce.saveCode(taskStep);
        if(response.equals("not code")){
            return ResponseEntity.badRequest().body("not code");
        }else if(response.equals("sucess")){
            return ResponseEntity.ok().body("sucess");
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}

