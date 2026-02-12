package wordbook.backend.domain.wordbookword.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import wordbook.backend.domain.wordbookword.entity.WordBookWordEntity;

import java.util.List;

@Repository
public interface WordBookWordRepository extends JpaRepository<WordBookWordEntity,Long> {
    @Query("""
    select wbw
    from WordBookWordEntity wbw
    join fetch wbw.wordEntity
    where wbw.wordBookEntity.id = :wordBookId
""")
    List<WordBookWordEntity> findWithWord(Long wordBookId);
}
