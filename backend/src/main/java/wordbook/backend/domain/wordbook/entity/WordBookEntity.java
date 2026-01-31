package wordbook.backend.domain.wordbook.entity;

import jakarta.persistence.*;
import lombok.Getter;
import wordbook.backend.domain.user.entity.UserEntity;

@Entity
@Table(name="wordbook")
@Getter
public class WordBookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name="word_book_name",nullable = false)
    private String name;

}
