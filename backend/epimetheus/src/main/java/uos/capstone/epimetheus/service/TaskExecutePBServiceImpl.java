package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import uos.capstone.epimetheus.dtos.TaskStep;

import java.io.*;

@RequiredArgsConstructor
@Log4j2
@Service
public class TaskExecutePBServiceImpl implements TaskExecuteService{

    @Value("${code.file}")
    String filepath;
    @Value("${code.docker}")
    String dockerpath;
    @Value("${sh.docker.run}")
    String dockerRun;
    @Value("${sh.docker.cp}")
    String dockerCp;
    @Value("${sh.docker.exec}")
    String dockerExec;
    @Value("${sh.docker.rm}")
    String dockerRm;


    static String containerID = "";
    @Override
    public String executeSubTask(TaskStep taskStep){
        String code = taskStep.getCode();
        StringBuilder sb = new StringBuilder();

        ProcessBuilder pb = new ProcessBuilder("/bin/bash", dockerRun);
        try {
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            containerID = reader.readLine().substring(0,12);
            log.info(containerID);
        }catch (Exception e){
            log.error(e);
        }

        makefile(code);
        sb.append(executeCode());

        ProcessBuilder rm = new ProcessBuilder("/bin/bash", dockerRm, containerID);
        try {
            rm.start();
        }catch (IOException e){
            log.error(e);
        }
        return sb.toString();
    }
    private void makefile(String code){
        File file = new File(filepath);
        try {
            PrintWriter writer = new PrintWriter(file);
            writer.println(code);
            writer.close();
        }catch (Exception e){
            log.error(e);
        }
    }
    private String executeCode() {

        StringBuilder sb = new StringBuilder();
        ProcessBuilder cpdocker = new ProcessBuilder("/bin/bash", dockerCp, filepath, containerID, dockerpath);
        ProcessBuilder execute = new ProcessBuilder("/bin/bash", dockerExec, containerID, dockerpath);
        try {
            cpdocker.start();
            Process exec = execute.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(exec.getInputStream()));
            BufferedReader errorreader = new BufferedReader(new InputStreamReader(exec.getErrorStream()));
            String line;
            while ((line = reader.readLine()) != null){
                sb.append(line);
                sb.append("\n");
            }
            line = errorreader.readLine();
            if(line != null){
                sb.append("RunTimeError\n");
                sb.append(line);
            }
            while ((line = errorreader.readLine()) != null){
                sb.append(line);
                sb.append("\n");
            }
        }catch (Exception e){
            log.error(e);
        }
        return  sb.toString();
    }
}
