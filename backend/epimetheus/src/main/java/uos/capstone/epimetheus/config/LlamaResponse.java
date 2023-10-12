package uos.capstone.epimetheus.config;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
public class LlamaResponse {

        private String id;
        private String object;
        private String created;
        private String model;
        private List<Choices> choices;
        private Usage usage;

        @Getter
        @Setter
        public static class Choices {
                private int index;
                private Message message;
                private String finish_reason;

                @Getter
                @Setter
                public static class Message {
                        private String role;
                        private String content;
                }
        };
        @Getter
        @Setter
        public static class Usage {
                private int prompt_tokens;
                private int completion_tokens;
                private int total_tokens;
        };


}
