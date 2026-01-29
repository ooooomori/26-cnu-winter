package project.backend.domain.word.repository;

import project.backend.domain.word.entity.WordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WordRepository extends JpaRepository<WordEntity,Long> {
}
