package uos.capstone.epimetheus.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import uos.capstone.epimetheus.dtos.llamaTasks.SubTaskResolver;
import uos.capstone.epimetheus.service.TaskSerivce;


@RestController
@RequiredArgsConstructor
@Log4j2
public class TaskController {

    private final TaskSerivce taskSerivce;

    @CrossOrigin(origins = "${setcors}")
    @PostMapping(path = "/tasks", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<SubTaskResolver> getTaskData(@RequestBody String taskName) {
        log.info(taskName);
        return taskSerivce.getSubTaskListInStream(taskName);
    }
}
