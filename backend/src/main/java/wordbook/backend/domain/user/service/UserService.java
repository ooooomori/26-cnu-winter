package wordbook.backend.domain.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import wordbook.backend.domain.user.dto.UserCreateDTO;
import wordbook.backend.domain.user.entity.UserEntity;
import wordbook.backend.domain.user.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public Long joinUser(UserCreateDTO userCreateDTO) {
        UserEntity userEntity= UserEntity.builder()
                .username(userCreateDTO.getUsername())
                .password(passwordEncoder.encode(userCreateDTO.getPassword()))
                .build();
        return userRepository.save(userEntity).getId();
    }
}
