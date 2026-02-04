package wordbook.backend.api;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ApiRequestDTO {
    private String model;
    private List<Message> input;

    @Getter
    @AllArgsConstructor
    public static class Message {
        private String role;
        private String content;
    }
}
