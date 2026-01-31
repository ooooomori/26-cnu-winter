package wordbook.backend.domain.wordbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wordbook.backend.domain.wordbook.entity.WordBookEntity;

@Repository
public interface WordBookRepository extends JpaRepository<WordBookEntity,Long> {
}
