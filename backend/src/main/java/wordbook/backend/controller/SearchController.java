package wordbook.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import wordbook.backend.api.ApiRequestDTO;
import wordbook.backend.api.ApiResponseDTO;
import wordbook.backend.api.ApiService;

@RestController
public class SearchController {
    private final ApiService apiService;
    public SearchController(ApiService apiService) {
        this.apiService = apiService;
    }
    @PostMapping("/search")
    public ResponseEntity<ApiResponseDTO> search(@RequestBody ApiRequestDTO apiRequestDTO) {
        ApiResponseDTO apiResponseDTO = apiService.callApi(apiRequestDTO);
        return ResponseEntity.ok(apiResponseDTO);
    }
}
