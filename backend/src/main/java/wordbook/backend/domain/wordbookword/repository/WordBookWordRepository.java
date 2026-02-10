package wordbook.backend.domain.wordbookword.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wordbook.backend.domain.wordbookword.entity.WordBookWordEntity;

@Repository
public interface WordBookWordRepository extends JpaRepository<WordBookWordEntity,Long> {
}
