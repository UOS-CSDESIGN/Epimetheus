package uos.capstone.epimetheus.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
public class LlamaStepResponse {
        private List<Choice> choices;

        public StringBuilder parseStreamContent() {
                try {
                        return choices.get(0).getDelta().getContent();
                } catch (NullPointerException e) {
                        return new StringBuilder();
                }
        }

        public StringBuilder parseBlockContent() {
                try {
                        return choices.get(0).getMessage().getContent();
                } catch (NullPointerException e) {
                        return new StringBuilder();
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