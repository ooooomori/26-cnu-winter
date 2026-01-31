package wordbook.backend.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.security.autoconfigure.SecurityAutoConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.ObjectMapper;
import wordbook.backend.api.ApiRequestDTO;
import wordbook.backend.api.ApiResponseDTO;
import wordbook.backend.api.ApiService;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.web.servlet.function.RequestPredicates.contentType;


@ExtendWith(MockitoExtension.class)
@WebMvcTest(SearchController.class)
@AutoConfigureMockMvc(addFilters = false)

class SearchControllerTest {
    @Autowired
    MockMvc mockMvc;
    @MockitoBean
    WebClient webClient;
    @MockitoBean
    ApiService apiService;

    SearchController searchController=new SearchController(apiService);
    @Test
    void search() throws Exception {
        //given
        ApiRequestDTO apiRequestDTO=new ApiRequestDTO("1","2");
        when(apiService.callApi(any(ApiRequestDTO.class))).thenReturn(new ApiResponseDTO("1","2","3","4"));
        mockMvc.perform(post("/search")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(apiRequestDTO)))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.meaning").value("1"));
    }

}