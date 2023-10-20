package uos.capstone.epimetheus.service;

import reactor.core.publisher.Flux;
import uos.capstone.epimetheus.dtos.llamaTasks.SubTaskResolver;

public interface TaskSerivce {

    Flux<SubTaskResolver> getSubTaskListInStream(String task);
}
