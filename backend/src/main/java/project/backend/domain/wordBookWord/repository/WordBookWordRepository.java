package project.backend.domain.wordBookWord.repository;

import project.backend.domain.wordBookWord.entity.WordBookWordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordBookWordRepository extends JpaRepository<WordBookWordEntity,Long> {
}
