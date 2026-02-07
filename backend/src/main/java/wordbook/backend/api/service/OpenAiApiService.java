package wordbook.backend.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.ObjectMapper;
import wordbook.backend.api.AiResponseDTO;
import wordbook.backend.api.ApiRequestDTO;
import wordbook.backend.api.ApiResponseDTO;

import java.util.List;

@Service
public class OpenAiApiService implements ApiService {

    private final String model;
    private final ObjectMapper objectMapper;
    private final WebClient webClient;
    public OpenAiApiService(WebClient webClient,@Value("${spring.ai.openai.chat.options.model}")String model,ObjectMapper objectMapper)
    {
        this.model=model;
        this.webClient = webClient;
        this.objectMapper=objectMapper;
    }
    @Override
    public ApiResponseDTO getResponse(String word, String lang) {
        String content=createContent(word,lang);
        ApiRequestDTO request = new ApiRequestDTO(
                model,
                List.of(new ApiRequestDTO.Message("user", content))
        );
        AiResponseDTO aiResponseDTO = webClient.post()
                .uri("/responses")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(AiResponseDTO.class)
                .block();
        String text = aiResponseDTO.getOutput()
                .get(0)
                .getContent()
                .get(0)
                .getText();
        ApiResponseDTO apiResponseDTO = objectMapper.readValue(text, ApiResponseDTO.class);
        return apiResponseDTO;

    }
    @Override
    public String createContent(String word,String lang) {
        return """
    단어: %s
    언어: %s

    위 단어에 대해 의미, 예문, 동의어, 반의어를 작성하라.
    """.formatted(word, lang);
    }
}