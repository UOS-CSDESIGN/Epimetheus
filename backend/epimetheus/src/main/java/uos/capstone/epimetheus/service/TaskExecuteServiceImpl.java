package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.PrintWriter;

@RequiredArgsConstructor
@Service
@Log4j2
public class TaskExecuteServiceImpl implements TaskExecuteService{
    @Override
    public String executeSubTask(String code){
        try {
            File file = new File("${docker.python}");
            PrintWriter writer = new PrintWriter(file);
            writer.println(code);
            writer.close();
            ProcessBuilder pb = new ProcessBuilder("docker", "build", "-t", "python_docker_image", "${docker.image}");
            pb.start();
        }catch (Exception e) {
            log.error(e);
        }

        return null;
    }
}
