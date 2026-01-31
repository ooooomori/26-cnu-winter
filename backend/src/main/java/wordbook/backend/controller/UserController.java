package wordbook.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wordbook.backend.api.ApiService;
import wordbook.backend.domain.user.dto.UserCreateDTO;
import wordbook.backend.domain.user.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    private UserService userService;
    private final ApiService apiService;
    public UserController(UserService userService,ApiService apiService) {
        this.userService = userService;
        this.apiService = apiService;
    }
    @PostMapping("")
    public ResponseEntity<Long> createUser(@RequestBody UserCreateDTO userCreateDTO) {
        Long id=userService.joinUser(userCreateDTO);
        return ResponseEntity.ok(id);
    }
}