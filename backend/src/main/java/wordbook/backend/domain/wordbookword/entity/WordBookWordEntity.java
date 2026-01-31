package wordbook.backend.domain.wordbookword.entity;

import jakarta.persistence.*;
import wordbook.backend.domain.word.entity.WordEntity;
import wordbook.backend.domain.wordbook.entity.WordBookEntity;

@Entity
@Table(name="wordbook_word")
public class WordBookWordEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wordbook_id", nullable = false)
    private WordBookEntity wordBook;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "word_id", nullable = false)
    private WordEntity word;

}
