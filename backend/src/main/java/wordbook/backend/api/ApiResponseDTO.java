package wordbook.backend.api;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponseDTO {

    private String meaning;
    private String example;
    private String synonym;
    private String antonym;
}
