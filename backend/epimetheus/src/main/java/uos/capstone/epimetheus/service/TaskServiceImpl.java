package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uos.capstone.epimetheus.config.LlamaServerAdapter;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskSerivce{

    private final LlamaServerAdapter llamaServerAdapter;

    @Override
    public String getSubTaskList(String task) {
        return llamaServerAdapter.sendRequest(task);
    }
}
