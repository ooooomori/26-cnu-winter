package wordbook.backend.ai;
//
//import org.springframework.ai.chat.messages.AssistantMessage;
//import org.springframework.ai.chat.messages.SystemMessage;
//import org.springframework.ai.chat.messages.UserMessage;
//import org.springframework.ai.chat.prompt.Prompt;
//import org.springframework.ai.openai.OpenAiChatModel;
//import org.springframework.stereotype.Service;
//import wordbook.backend.api.ApiRequestDTO;
//import wordbook.backend.api.ApiResponseDTO;
//
//@Service
//
//public class OpenAiService {
//    private final OpenAiChatModel openAiChatModel;
//    private final String systemMessage="";
//    public OpenAiService(OpenAiChatModel openAiChatModel) {
//        this.openAiChatModel = openAiChatModel;
//    }
//
//    public Prompt getPrompt(String word,String lang) {
//
//        SystemMessage systemMessage = new SystemMessage("");
//        UserMessage userMessage = new UserMessage();
//        AssistantMessage assistantMessage = new AssistantMessage("");
//
//    }
//    public ApiResponseDTO callOpenAi(ApiRequestDTO apiRequestDTO) {
//
//    }
//}
