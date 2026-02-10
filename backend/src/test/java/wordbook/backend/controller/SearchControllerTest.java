package wordbook.backend.controller;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.reactive.function.client.WebClient;
import wordbook.backend.api.ApiResponseDTO;
import wordbook.backend.api.service.OpenAiApiService;
import wordbook.backend.domain.word.service.WordService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(SearchController.class)
@AutoConfigureMockMvc(addFilters = false)

class SearchControllerTest {
    @Autowired
    MockMvc mockMvc;
    @MockitoBean
    WebClient webClient;
    @MockitoBean
    OpenAiApiService apiService;
    @MockitoBean
    WordService wordService;
    SearchController searchController=new SearchController(apiService,wordService);
    @Test
    void search() throws Exception {
        //given
        when(apiService.getResponse(anyString(), anyString()))
                .thenReturn(new ApiResponseDTO("1", "2", "3", "4"));
        mockMvc.perform(get("/search?word=1&lang=en"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.meaning").value("1"));
    }

}