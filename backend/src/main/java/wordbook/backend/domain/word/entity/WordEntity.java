package wordbook.backend.domain.word.entity;

import jakarta.persistence.*;
import wordbook.backend.domain.user.entity.UserEntity;

@Entity
@Table(name="word")
public class WordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "wordname", nullable = false)
    private String wordname;

    @Column(name = "meaning", nullable = false)
    private String meaning;

    @Column(name = "example")
    private String example;

    @Column(name = "synonym")
    private String synonym;

    @Column(name = "antonym")
    private String antonym;
}