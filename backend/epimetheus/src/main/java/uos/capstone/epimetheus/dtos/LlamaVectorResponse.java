package uos.capstone.epimetheus.dtos;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;

import java.util.List;

@Getter
public class LlamaVectorResponse {

    private List<EmbeddingData> data;
    private TokenUsage usage;

    public float[] getVector() {
        if((data != null ? data.size() : 0) != 1) {
            throw new RuntimeException("Invalid Data Came");
        }

        return data.get(0).parseToVector();
    }
}

@Getter
class EmbeddingData {

    private String object;
    private String embedding;
    private String index;

    public float[] parseToVector() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(embedding, float[].class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to deserialize embedding", e);
        }
    }
}

@Getter
class TokenUsage {
    private int prompt_tokens;
    private int total_tokens;
}
