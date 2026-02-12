package wordbook.backend.domain.wordbookword.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import wordbook.backend.domain.word.dto.WordResponseDTO;
import wordbook.backend.domain.wordbookword.entity.WordBookWordEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class WordBookWordServiceTest {
    @Autowired
    private WordBookWordService wordBookWordService;
    @Test
    void getWordBookWord() {
        //given
        Long id = 1L;

        List<WordResponseDTO> wordBook = wordBookWordService.getWordBook(id);
        for(WordResponseDTO wordResponseDTO : wordBook) {
            System.out.println(wordResponseDTO);
        }
    }
}