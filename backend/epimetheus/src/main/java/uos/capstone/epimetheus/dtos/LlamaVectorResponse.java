package uos.capstone.epimetheus.dtos;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;

import java.util.List;

@Getter
public class LlamaVectorResponse {

    private List<EmbeddingData> data;
    private TokenUsage usage;

    public double[] getVector() {
        if((data != null ? data.size() : 0) != 1) {
            throw new RuntimeException("Invalid Data Came");
        }

        return data.get(0).getEmbedding();
    }
}

@Getter
class EmbeddingData {

    private String object;
    private double[] embedding;
    private int index;
}

@Getter
class TokenUsage {
    private int prompt_tokens;
    private int total_tokens;
}
