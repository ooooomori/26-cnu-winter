package project.backend.api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import project.backend.api.dto.BoardDTO;

@Service
public class ApiServiceImpl implements ApiService {
    private final WebClient webClient;
    public ApiServiceImpl(WebClient webClient) {
        this.webClient = webClient;
    }

    public BoardDTO callApi(String query) {
        return webClient.get()
                .uri("https://jsonplaceholder.typicode.com/posts/{q}", query)
                .retrieve()
                .bodyToMono(BoardDTO.class)
                .block();
    }
}
