package wordbook.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    private final String apiKey;
    public WebClientConfig(@Value("${spring.ai.openai.api-key}") String apiKey) {
        this.apiKey = apiKey;
    }
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
//                .baseUrl("https://api.openai.com/v1")
                .baseUrl("http://localhost:8089")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

    }
}

