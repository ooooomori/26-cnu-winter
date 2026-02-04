package wordbook.backend.domain.word.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import wordbook.backend.api.ApiResponseDTO;
import wordbook.backend.domain.user.entity.UserEntity;
import wordbook.backend.domain.user.repository.UserRepository;
import wordbook.backend.domain.word.dto.WordResponseDTO;
import wordbook.backend.domain.word.entity.WordEntity;
import wordbook.backend.domain.word.repository.WordRepository;


import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;


@ExtendWith(MockitoExtension.class)
class WordServiceTest {
    @InjectMocks
    WordService wordService;
    @Mock
    WordRepository wordRepository;
    @Mock
    UserRepository userRepository;
    @Test
    void createWord() {
        //given
        String word = "test";
        String lang = "en";
        ApiResponseDTO apiResponseDTO=new ApiResponseDTO("1","2","3","4");
        WordEntity wordEntity=WordEntity.builder()
                .word(word)
                .lang(lang)
                .meaning(apiResponseDTO.getMeaning())
                .example(apiResponseDTO.getExample())
                .synonym(apiResponseDTO.getSynonym())
                .antonym(apiResponseDTO.getAntonym())
                .build();
        WordResponseDTO wordResponseDTO=new WordResponseDTO("test","en","1","2","3","4");
        String username = "ㅎㅇ";
        UserEntity userEntity=UserEntity.builder()
                .id(1l)
                .build();
        //when
        given(userRepository.findByUsername(anyString())).willReturn(Optional.of(userEntity));
        given(wordRepository.save(any(WordEntity.class))).willReturn(wordEntity);
        //then
        WordResponseDTO word1 = wordService.createWord(word, lang, apiResponseDTO, username);
        assertThat(word1).isEqualTo(wordResponseDTO);
    }
}