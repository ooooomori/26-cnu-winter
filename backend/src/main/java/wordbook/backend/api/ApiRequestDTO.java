package wordbook.backend.api;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiRequestDTO {
    private String word;
    private String lang;
}
