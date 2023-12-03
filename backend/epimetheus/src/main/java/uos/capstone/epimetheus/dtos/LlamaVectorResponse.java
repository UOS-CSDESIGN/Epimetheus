package uos.capstone.epimetheus.dtos;

import lombok.Getter;
import lombok.extern.log4j.Log4j2;
import uos.capstone.epimetheus.dtos.exception.InvalidDataException;

import java.util.List;

@Getter
@Log4j2
public class LlamaVectorResponse {

    private List<EmbeddingData> data;
    private TokenUsage usage;

    public double[] getVector() {
        if((data != null ? data.size() : 0) != 1) {
            log.error("Invalid Data Came in LlamaVectorResponse");
            throw new InvalidDataException("Please try again");
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
