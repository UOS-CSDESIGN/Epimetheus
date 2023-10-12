package uos.capstone.epimetheus.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import uos.capstone.epimetheus.service.TaskSerivce;

@RestController
@RequiredArgsConstructor
public class TaskController {

    private final TaskSerivce taskSerivce;

    @PostMapping("/api/posts")
    public String getSubTaskList(String code){
        return taskSerivce.getSubTaskList(code);
    }

}
