package uos.capstone.epimetheus.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import uos.capstone.epimetheus.adapter.LlamaAdapter;
import uos.capstone.epimetheus.dtos.TaskStep;

import java.util.Comparator;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class CosineSimilarityService implements SimilarityService {

    private final LlamaAdapter llamaAdapter;
    private final DatabaseService databaseService;

    @Override
    public TaskStep getSimilarStep(String step) {

        double[] inputVector = llamaAdapter.getVectorFromSentence(step).block();
        Optional<TaskStep> similar = databaseService.getAllData().stream()
                                    .filter(data -> data.getValues() != null && data.getValues().length == inputVector.length)
                                    .filter(data -> cosineSimilarity(inputVector, data.getValues()) >= 0.8)
                                    .sorted(Comparator.comparing(data -> (-1) * cosineSimilarity(inputVector, data.getValues())))
                                    .findFirst();

        return similar.orElseGet(() -> databaseService.saveByTitle(step, inputVector));
    }


    private double cosineSimilarity(double[] input, double[] toCompare) {
        if (input.length != toCompare.length) {
            log.error("The vectors have different length in CosineSimilarityService.cosineSimilarity");
            throw new IllegalArgumentException("Vectors must have the same length");
        }

        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;

        for (int i = 0; i < input.length; i++) {
            dotProduct += input[i] * toCompare[i];
            normA += input[i] * input[i];
            normB += toCompare[i] * toCompare[i];
        }

        if (normA == 0 || normB == 0) {
            // If one of the vectors has a magnitude of 0, then similarity is undefined (returning 0 or a special case value might be appropriate)
            return 0;
        }

        double result = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
        return result;
    }
}
