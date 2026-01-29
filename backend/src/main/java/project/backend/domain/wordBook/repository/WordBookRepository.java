package project.backend.domain.wordBook.repository;

import project.backend.domain.wordBook.entity.WordBookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordBookRepository extends JpaRepository<WordBookEntity,Long> {
}
