package wordbook.backend.api;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ApiService  {
    private final WebClient webClient;
    public ApiService(WebClient webClient) {
        this.webClient = webClient;
    }

    public ApiResponseDTO callApi(ApiRequestDTO apiRequestDTO) {
//        return webClient.get()
//                .uri("https://jsonplaceholder.typicode.com/posts/{q}", query)
//                .retrieve()
//                .bodyToMono(ApiResponseDTO.class)
//                .block();
        return new ApiResponseDTO("1","2","3","4");
    }
}