package wordbook.backend.domain.wordbook.service;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import wordbook.backend.domain.wordbook.dto.WordBookRequestDTO;
import wordbook.backend.domain.wordbook.dto.WordBookResponseDTO;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class WordBookServiceTest {
    @Autowired
    private WordBookService wordBookService;
    @Test

    @Transactional
    public void createWordBook() {
        //given
        String username="admin";
        String wordBookName="korean1";
        WordBookRequestDTO wordBookRequestDTO=new WordBookRequestDTO(wordBookName);
        //
         wordBookService.save(wordBookRequestDTO, username);

    }
    @Test
    public void getWordBook() {
        //given
        String username="admin";

        List<WordBookResponseDTO> myAll = wordBookService.findMyAll(username);
        for (WordBookResponseDTO wordBookResponseDTO : myAll) {
            System.out.println(wordBookResponseDTO);
        }

    }


}