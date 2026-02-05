package wordbook.backend.domain.wordbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wordbook.backend.domain.user.entity.UserEntity;
import wordbook.backend.domain.wordbook.entity.WordBookEntity;

import java.util.List;


@Repository
public interface WordBookRepository extends JpaRepository<WordBookEntity,Long> {
    List<WordBookEntity> findByUserEntity(UserEntity userEntity);
}
