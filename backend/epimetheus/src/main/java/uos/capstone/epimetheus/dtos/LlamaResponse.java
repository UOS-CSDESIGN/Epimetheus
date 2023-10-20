package uos.capstone.epimetheus.dtos;

import lombok.Getter;

import java.util.List;

@Getter
public class LlamaResponse {
        private List<Choices> choices;

        public String parseContent() {
                try {
                        return choices.get(0).getDelta().getContent();
                } catch (NullPointerException e) {
                        return "";
                }
        }


}
@Getter
class Choices {
        private Delta delta;

}
@Getter
class Delta {
        private String content = "";
}
