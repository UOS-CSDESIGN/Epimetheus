package uos.capstone.epimetheus.dtos;

import lombok.Getter;

import java.util.List;

@Getter
public class LlamaVectorResponse {

    private List<EmbeddingData> data;
    private TokenUsage usage;
}

@Getter
class EmbeddingData {

    private String object;
    private String embedding;
    private String index;
}

@Getter
class TokenUsage {
    private int prompt_tokens;
    private int total_tokens;
}
