package wordbook.backend.api;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiResponseDTO {

    private String meaning;
    private String synonym;
    private String example;
    private String antonym;
}
