package uos.capstone.epimetheus.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import uos.capstone.epimetheus.dtos.exception.EmptyDataException;

import java.util.ArrayList;
import java.util.List;

@Getter
@Log4j2
public class LlamaStepResponse {
        private List<Choice> choices;

        public StringBuilder parseStreamContent() {
                try {
                        return choices.get(0).getDelta().getContent();
                } catch (NullPointerException e) {
                        log.error("No content at Response in LlamaStepResponse.parseStreamContent");
                        throw new EmptyDataException("INTERNAL_SERVER_ERROR");
                }
        }

        public StringBuilder parseBlockContent() {
                try {
                        return choices.get(0).getMessage().getContent();
                } catch (NullPointerException e) {
                        log.error("No content at Response in LlamaStepResponse.parseBlockContent");
                        throw new EmptyDataException("INTERNAL_SERVER_ERROR");
                }
        }

        public static LlamaStepResponse eof() {
                LlamaStepResponse response = new LlamaStepResponse();
                response.choices = new ArrayList<>();
                response.choices.add(new Choice("[DONE]"));

                return response;
        }
}
@Getter
@NoArgsConstructor
class Choice {
        private Delta delta;
        private Message message;

        @Builder
        Choice(String content, String message) {
                this.delta = new Delta(content);
                this.message = new Message(message);
        }

        Choice(String content) {
                this.delta = new Delta(content);
        }

}
@Getter
@NoArgsConstructor
class Delta {
        private StringBuilder content = new StringBuilder();

        @Builder
        Delta(String content) {
                this.content.append(content);
        }
}

@Getter
@NoArgsConstructor
class Message {
        private StringBuilder content = new StringBuilder();

        @Builder
        Message(String content) {
                this.content.append(content);
        }
}
