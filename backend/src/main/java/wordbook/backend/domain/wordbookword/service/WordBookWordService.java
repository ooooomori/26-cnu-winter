package wordbook.backend.domain.wordbookword.service;

import org.springframework.stereotype.Service;
import wordbook.backend.api.ApiResponseDTO;
import wordbook.backend.domain.word.dto.WordResponseDTO;
import wordbook.backend.domain.word.entity.WordEntity;
import wordbook.backend.domain.word.repository.WordRepository;
import wordbook.backend.domain.word.service.WordService;
import wordbook.backend.domain.wordbook.entity.WordBookEntity;
import wordbook.backend.domain.wordbook.repository.WordBookRepository;
import wordbook.backend.domain.wordbookword.entity.WordBookWordEntity;
import wordbook.backend.domain.wordbookword.repository.WordBookWordRepository;

import java.util.List;

@Service
public class WordBookWordService {
    private final WordBookWordRepository  wordBookWordRepository;
    private final WordRepository wordRepository;
    private final WordBookRepository wordBookRepository;
    public WordBookWordService(WordBookWordRepository wordBookWordRepository, WordRepository wordRepository, WordBookRepository wordBookRepository) {
        this.wordBookWordRepository = wordBookWordRepository;
        this.wordRepository = wordRepository;
        this.wordBookRepository = wordBookRepository;
    }
    public List<WordResponseDTO>getWordBook(long id){
        List<WordResponseDTO> words = wordBookWordRepository.findWithWord(id).stream()
                .map(wbw->WordResponseDTO.builder()
                        .word(wbw.getWordEntity().getWord())
                        .lang(wbw.getWordEntity().getLang())
                        .meaning(wbw.getWordEntity().getMeaning())
                        .example(wbw.getWordEntity().getExample())
                        .synonym(wbw.getWordEntity().getSynonym())
                        .antonym(wbw.getWordEntity().getAntonym())
                        .build())
                .toList();
        return words;

    }
    public Long createWordBookWord(Long wordId,Long wordbookId){
        WordBookEntity wordBookEntity = wordBookRepository.findById(wordbookId).orElseThrow(()-> new RuntimeException("not found"));
        WordEntity wordEntity = wordRepository.findById(wordId).orElseThrow(()-> new RuntimeException("not found"));
        if (!wordEntity.getUserEntity().getId()
                .equals(wordBookEntity.getUserEntity().getId())) {
            throw new RuntimeException("not found");
        }
        WordBookWordEntity wordBookWordEntity = WordBookWordEntity.builder()
                .wordBookEntity(wordBookEntity)
                .wordEntity(wordEntity)
                .build();
        return wordBookWordRepository.save(wordBookWordEntity).getId();

    }
}
