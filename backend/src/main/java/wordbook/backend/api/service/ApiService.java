package wordbook.backend.api.service;

import wordbook.backend.api.ApiResponseDTO;

public interface ApiService {
    public ApiResponseDTO getResponse(String word, String lang) ;
    public String createContent(String word,String lang);
}
