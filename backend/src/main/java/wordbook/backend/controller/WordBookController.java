package wordbook.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import wordbook.backend.api.ApiResponseDTO;
import wordbook.backend.domain.word.dto.WordResponseDTO;
import wordbook.backend.domain.wordbook.dto.WordBookRequestDTO;
import wordbook.backend.domain.wordbook.dto.WordBookResponseDTO;
import wordbook.backend.domain.wordbook.service.WordBookService;
import wordbook.backend.domain.wordbookword.service.WordBookWordService;

import java.util.List;

@RestController
@RequestMapping("/wordbook")
public class WordBookController {
    private final WordBookService wordBookService;
    private final WordBookWordService wordBookWordService;
    public WordBookController(WordBookService wordBookService, WordBookWordService wordBookWordService) {
        this.wordBookService = wordBookService;
        this.wordBookWordService = wordBookWordService;
    }
    @PostMapping("")
    public ResponseEntity<WordBookResponseDTO> create(@RequestBody WordBookRequestDTO wordBookRequestDTO, Authentication authentication) {
        String username=authentication.getName();
        WordBookResponseDTO save = wordBookService.save(wordBookRequestDTO, username);
        return ResponseEntity.ok(save);
    }
    @GetMapping("list")
    public ResponseEntity<List<WordBookResponseDTO>> list(Authentication authentication) {
        String username = authentication.getName();
        List<WordBookResponseDTO> myAll = wordBookService.findMyAll(username);
        return ResponseEntity.ok(myAll);
    }
    @GetMapping("")
    public ResponseEntity<List<WordResponseDTO>> getWordBook(@RequestParam long id) {
        List<WordResponseDTO> wordBook = wordBookWordService.getWordBook(id);
        return ResponseEntity.ok(wordBook);
    }

}
