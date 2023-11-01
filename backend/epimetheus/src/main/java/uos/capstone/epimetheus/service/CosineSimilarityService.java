package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import uos.capstone.epimetheus.adapter.LlamaAdapter;
import uos.capstone.epimetheus.dtos.TaskStep;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CosineSimilarityService implements SimilarityService {

    private final LlamaAdapter llamaAdapter;
    private final DatabaseService databaseService;

    @Override
    public Mono<TaskStep> getSimilarStep(String step) {
        return llamaAdapter.getVectorFromSentence(step)
                .flatMap(inputVector -> {
                    return Mono.justOrEmpty(
                            databaseService.getAllData().stream()
                                    .filter(data -> cosineSimilarity(inputVector, data.getValues()) >= 0.9f)
                                    .min(Comparator.comparing(data -> -cosineSimilarity(inputVector, data.getValues())))
                                    .orElse(TaskStep.of(step))
                    );
                });
    }


    private float cosineSimilarity(float[] input, float[] toCompare) {
        if (input.length != toCompare.length) {
            throw new IllegalArgumentException("Vectors must have the same length");
        }

        float dotProduct = 0.0f;
        float normA = 0.0f;
        float normB = 0.0f;

        for (int i = 0; i < input.length; i++) {
            dotProduct += input[i] * toCompare[i];
            normA += input[i] * input[i];
            normB += toCompare[i] * toCompare[i];
        }

        if (normA == 0 || normB == 0) {
            // If one of the vectors has a magnitude of 0, then similarity is undefined (returning 0 or a special case value might be appropriate)
            return 0;
        }

        return dotProduct / (float) (Math.sqrt(normA) * Math.sqrt(normB));
    }
}
