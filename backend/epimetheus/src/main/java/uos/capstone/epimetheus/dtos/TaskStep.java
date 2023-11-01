package uos.capstone.epimetheus.dtos;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import uos.capstone.epimetheus.dtos.llamaTasks.CodeLanguage;

import java.util.Arrays;
import java.util.Objects;


@Document(collection = "subtask")
public class TaskStep {

    @Id
    String title;
    float[] values;

    @DBRef(lazy = true)
    CodeLanguage language;
    @DBRef(lazy = true)
    String code;

    @Builder
    public TaskStep(String title, float[] values, CodeLanguage language, String code){
        this.title = title;
        this.values = values;
        this.language = language;
        this.code = code;
    }

    public static TaskStep of(String title) {
        return TaskStep.builder()
                .title(title)
                .values(new float[]{0.0f})
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

    public float[] getValues() {
        return this.values;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskStep taskStep = (TaskStep) o;
        return Objects.equals(title, taskStep.title) && Arrays.equals(values, taskStep.values) && language == taskStep.language && Objects.equals(code, taskStep.code);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(title, language, code);
        result = 31 * result + Arrays.hashCode(values);
        return result;
    }

    @Override
    public String toString() {
        return "TaskStep{" +
                "title='" + title + '\'' +
                ", values=" + Arrays.toString(values) +
                ", language=" + language +
                ", code='" + code + '\'' +
                '}';
    }
}
