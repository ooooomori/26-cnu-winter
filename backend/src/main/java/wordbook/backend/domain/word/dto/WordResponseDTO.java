package wordbook.backend.domain.word.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class WordResponseDTO {
    private String word;
    private String lang;
    private String meaning;
    private String example;
    private String synonym;
    private String antonym;
}
