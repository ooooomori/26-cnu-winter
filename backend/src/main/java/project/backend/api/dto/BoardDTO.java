package project.backend.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardDTO {
    private Long userId;
    private Long id;
    private String title;
    private boolean completed;
}
