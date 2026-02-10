package wordbook.backend.api.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;
import wordbook.backend.api.ApiResponseDTO;

@Service
@Primary
public class ChatClientService implements ApiService {
    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;
    private final String systemMessage= """
너는 단어장 API용 AI다.
반드시 JSON만 반환해라.
다른 텍스트는 절대 출력하지 마라.
다음 형식으로만 응답해라.

{
  "meaning": "",
  "example": "",
  "synonym": "",
  "antonym": ""
}
""";
    public ChatClientService(ChatClient.Builder builder, ObjectMapper objectMapper) {
        this.chatClient = builder.build();
        this.objectMapper = objectMapper;
    }
   @Override
    public ApiResponseDTO getResponse(String word, String lang) {

        String content=createContent(word,lang);
        String response = callApi(content);
        ApiResponseDTO apiResponseDTO = objectMapper.readValue(response, ApiResponseDTO.class);
        return apiResponseDTO;
    }

    @Override
    public String createContent(String word, String lang) {
        return """
    단어: %s
    언어: %s
    위 단어에 대해 의미, 예문, 동의어, 반의어를 작성하라.
    """.formatted(word, lang);
    }
    public String callApi(String content){
        return chatClient.prompt()
                .system(systemMessage)
                .user(content)
                .call()
                .content();
    }
}
