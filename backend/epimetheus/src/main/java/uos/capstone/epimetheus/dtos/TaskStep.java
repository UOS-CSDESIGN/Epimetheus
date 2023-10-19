package uos.capstone.epimetheus.dtos;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import uos.capstone.epimetheus.dtos.llamaTasks.CodeLanguage;


@Document(collection = "subtask")
public class TaskStep {

    @Id
    String title;
    CodeLanguage language;
    String code;

    @Builder
    public TaskStep(String title, CodeLanguage language, String code){
        this.title = title;
        this.language = language;
        this.code = code;
    }

    public static TaskStep of(String title) {
        return TaskStep.builder()
                .title(title)
                .language(CodeLanguage.DEFAULT)
                .code("")
                .build();
    }

    public String getCode() {
        if(code == null || code.isEmpty()) {
            return "Code Not Exists";
        }

        return code;
    }

    public String getLanguage() {
        if(code == null || code.isEmpty()) {
            return "Language Not Defined";
        }

        return language.getLanguage();
    }
}
