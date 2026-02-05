package wordbook.backend.domain.wordbook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wordbook.backend.domain.user.entity.UserEntity;

@Entity
@Table(name="wordbook")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WordBookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userEntity;

    @Column(name="word_book_name",nullable = false)
    private String name;
}
