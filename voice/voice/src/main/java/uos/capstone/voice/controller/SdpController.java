package uos.capstone.voice.controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import uos.capstone.voice.domain.SignalMessage;

@Slf4j
@Controller
@RequiredArgsConstructor
class SdpController{

    private final SimpMessageSendingOperations sendingOperations;
    @MessageMapping("/sdp")
    public void signaling(@Payload SignalMessage message) {
        if (message.getType().equals("offer")) {
            sendingOperations.convertAndSend("/sub/offer", message);
        }
    }
}
