package wordbook.backend.domain.word.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wordbook.backend.domain.user.entity.UserEntity;
import wordbook.backend.domain.word.entity.WordEntity;
import wordbook.backend.domain.wordbook.entity.WordBookEntity;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<WordEntity,Long> {
    List<WordEntity> findByUserEntity(UserEntity userEntity);
}

