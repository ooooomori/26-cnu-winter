package wordbook.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.ai.chat.client.ChatClient;

import tools.jackson.databind.ObjectMapper;
import wordbook.backend.api.ApiResponseDTO;
import wordbook.backend.api.service.ChatClientService;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.anyString;

import static org.mockito.BDDMockito.willReturn;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;


class ChatClientServiceSpyTest {

    @Mock
    ChatClient.Builder builder;

    @Mock
    ChatClient chatClient;

    ObjectMapper objectMapper = new ObjectMapper();
    ChatClientService spyService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Builder.build()가 chatClient 반환하도록 Mock
        when(builder.build()).thenReturn(chatClient);

        // 실제 객체 생성 후 Spy
        ChatClientService realService = new ChatClientService(builder, objectMapper);
        spyService = Mockito.spy(realService);
    }

    @Test
    void testGetResponse_withStubbedCallApi() throws Exception {
        String fakeJson = """
        {
          "meaning": "의미",
          "example": "예문",
          "synonym": "동의어",
          "antonym": "반의어"
        }
        """;

        // callApi만 Stub
        doReturn(fakeJson).when(spyService).callApi(anyString());

        ApiResponseDTO response = spyService.getResponse("word", "ko");
        System.out.println("response.getMeaning() = " + response.getMeaning());
        System.out.println("response.getExample() = " + response.getExample());
        System.out.println("response.getSynonym() = " + response.getSynonym());

        assertThat(response.getMeaning()).isEqualTo("의미");
        assertThat(response.getExample()).isEqualTo("예문");
        assertThat(response.getSynonym()).isEqualTo("동의어");
        assertThat(response.getAntonym()).isEqualTo("반의어");
    }
}