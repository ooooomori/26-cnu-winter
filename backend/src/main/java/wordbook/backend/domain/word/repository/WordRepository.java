package wordbook.backend.domain.word.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wordbook.backend.domain.word.entity.WordEntity;

@Repository
public interface WordRepository extends JpaRepository<WordEntity,Long> {
}

