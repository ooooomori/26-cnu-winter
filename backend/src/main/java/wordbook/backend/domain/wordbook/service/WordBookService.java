package wordbook.backend.domain.wordbook.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wordbook.backend.domain.user.entity.UserEntity;
import wordbook.backend.domain.user.service.UserService;
import wordbook.backend.domain.wordbook.dto.WordBookRequestDTO;
import wordbook.backend.domain.wordbook.dto.WordBookResponseDTO;
import wordbook.backend.domain.wordbook.entity.WordBookEntity;
import wordbook.backend.domain.wordbook.repository.WordBookRepository;

import java.util.List;

@Service
public class WordBookService {
    private final UserService userService;
    private final WordBookRepository wordBookRepository;

    public WordBookService( WordBookRepository wordBookRepository, UserService userService) {
        this.userService = userService;
        this.wordBookRepository = wordBookRepository;

    }
    @Transactional(readOnly = true)
    public List<WordBookResponseDTO> findMyAll(String username) {
        UserEntity user= userService.findUserByUsername(username);
        return wordBookRepository.findByUserEntity(user).stream()
                .map(wordBook->WordBookResponseDTO.builder()
                        .name(wordBook.getName())
                        .id(wordBook.getId())
                        .build()).toList();

    }
    @Transactional
    public boolean createWordBook(WordBookRequestDTO wordBookRequestDTO,String username) {
        UserEntity user = userService.findUserByUsername(username);
        WordBookEntity wordBook= WordBookEntity.builder()
                .userEntity(user)
                .name(wordBookRequestDTO.getName())
                .build();
        wordBookRepository.save(wordBook);
        return true;
    }
}
