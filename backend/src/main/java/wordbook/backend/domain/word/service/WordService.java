package wordbook.backend.domain.word.service;


import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import wordbook.backend.api.ApiResponseDTO;
import wordbook.backend.domain.user.entity.UserEntity;
import wordbook.backend.domain.user.repository.UserRepository;
import wordbook.backend.domain.word.dto.WordResponseDTO;
import wordbook.backend.domain.word.entity.WordEntity;
import wordbook.backend.domain.word.repository.WordRepository;

@Service
public class WordService {
    private final WordRepository wordRepository;
    private final UserRepository userRepository;
    public WordService(WordRepository wordRepository, UserRepository userRepository) {
        this.wordRepository = wordRepository;
        this.userRepository = userRepository;
    }
    public WordResponseDTO createWord(String word, String lang, ApiResponseDTO apiResponseDTO, String username) {
        UserEntity user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("not found user"));
        WordEntity wordEntity = WordEntity.builder()
                .user(user)
                .antonym(apiResponseDTO.getAntonym())
                .example(apiResponseDTO.getExample())
                .meaning(apiResponseDTO.getMeaning())
                .synonym(apiResponseDTO.getSynonym())
                .lang(lang)
                .word(word)
                .build();
        WordEntity save = wordRepository.save(wordEntity);
        WordResponseDTO wordResponseDTO= WordResponseDTO.builder()
                .word(save.getWord())
                .antonym(save.getAntonym())
                .example(save.getExample())
                .meaning(save.getMeaning())
                .synonym(save.getSynonym())
                .lang(save.getLang())
                .build();
        return wordResponseDTO;
    }
}
