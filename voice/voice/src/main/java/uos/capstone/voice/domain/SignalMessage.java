package uos.capstone.voice.domain;

import lombok.Data;

@Data
public class SignalMessage {
    String type;
    String sdp;
}
