package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import uos.capstone.epimetheus.dtos.TaskStep;

import java.io.*;
import java.net.Socket;

@RequiredArgsConstructor
@Log4j2
@Service
public class TaskExecuteLocalServiceImpl implements TaskExecuteService{

    @Override
    public String executeSubTask(TaskStep taskStep){
        String code = taskStep.getCode();
        StringBuilder sb = new StringBuilder();
        String containerId = "";

        ProcessBuilder pb = new ProcessBuilder("docker", "run", "-P", "-d", "tank3a/code-validation");
        try {
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            containerId = reader.readLine();
        }catch (Exception e){
            log.error(e);
        }

        String codeToTest = taskStep.getCode();
        try {
            // Execute the code and wait for the response
            sb.append(executeCode(containerId, codeToTest));
        } catch (Exception e) {
            log.error("Error executing code: ", e);
        }

        return sb.toString();
    }

    private String executeCode(String containerId, String codeToTest) {
        StringBuilder response = new StringBuilder();

        //checking forwarding port to docker container.
        ProcessBuilder pb = new ProcessBuilder("docker", "port", containerId);
        String localhost = "0.0.0.0";
        int port = 3000;
        try {
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String portInput = reader.readLine();
            port = Integer.parseInt(portInput.substring(portInput.indexOf(localhost) + localhost.length() + 1));
        } catch (IOException e) {
            log.error(e);
        } catch (NumberFormatException e) {
            log.error(e);
        } catch (IndexOutOfBoundsException e) {
            log.error(e);
        }

        try (Socket socket = new Socket(localhost, port);
             BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
             BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {

            writer.write(codeToTest);
            writer.newLine();
            writer.flush();

            // Reading the response from the server
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line).append("\n");
            }
        } catch (Exception e) {
            log.error("Error communicating with the code validation server", e);
        } finally {
            ProcessBuilder rm = new ProcessBuilder("docker", "rm", "-f", containerId);
            try {
                rm.start();
            }catch (IOException e){
                log.error(e);
            }
        }

        return response.toString();
    }
}
