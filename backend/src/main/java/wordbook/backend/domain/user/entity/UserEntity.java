package wordbook.backend.domain.user.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="user")
public class UserEntity {
    public void setId(Long id){
        this.id=id;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="username", unique = true, nullable=false)
    private String username;

    @Column(name="password", nullable = false)
    private String password;
}
