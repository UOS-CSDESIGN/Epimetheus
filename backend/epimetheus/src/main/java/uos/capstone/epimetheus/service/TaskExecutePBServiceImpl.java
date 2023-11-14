package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.PrintWriter;

@RequiredArgsConstructor
@Log4j2
@Service
public class TaskExecutePBServiceImpl implements TaskExecuteService{
    @Override
    public String executeSubTask(String code){
        File file = new File("C:\\capstone\\pythoncode\\python.py");
        StringBuilder sb = new StringBuilder();
        try {
            PrintWriter writer = new PrintWriter(file);
            writer.println(code);
            writer.close();
        }catch (Exception e){
            log.error(e);
        }

        String[] cmd = {"wsl", "docker", "run", "-d", "-t", "python"};
        ProcessBuilder pb = new ProcessBuilder(cmd);
        String containerID = "";
        try {
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            containerID = reader.readLine().substring(0,12);
            log.info(containerID);
        }catch (Exception e){
            log.error(e);
        }

        String[] cmd0 = {"wsl", "docker", "stop", containerID};
        ProcessBuilder pb3 = new ProcessBuilder("wsl", "docker", "exec", "-it", containerID, "bash", "-c", "echo \"print('Hello, World!')\" > python.py");
        String[] cmd1 = {"wsl", "docker", "cp", "C:\\capstone\\pythoncode\\python.py", containerID + ":/root/python.py"};
        String[] cmd2 = {"wsl", "docker", "exec", containerID, "python", "python.py"};
        ProcessBuilder pb1 = new ProcessBuilder(cmd1);
        ProcessBuilder pb2 = new ProcessBuilder(cmd2);


        try {
            Process process = pb3.start();
            Process process1 = pb2.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process1.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null){
                log.info(line);
                sb.append(line);
            }
        }catch (Exception e){
            log.error(e);
        }

        return sb.toString();
    }
}
