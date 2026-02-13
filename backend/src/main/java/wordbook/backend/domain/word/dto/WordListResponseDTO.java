package wordbook.backend.domain.word.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class WordListResponseDTO {
    private Long wordId;
    private String word;
    private String meaning;
    private String lang;
    private String example;
    private String synonym;
    private String antonym;
}
