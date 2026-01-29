package project.backend.controller;

import project.backend.api.service.ApiService;
import project.backend.api.dto.BoardDTO;
import project.backend.domain.user.dto.UserCreateDTO;
import project.backend.domain.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("")
    public ResponseEntity<BoardDTO> board(){
        BoardDTO boardDTO = apiService.callApi("1");
        return ResponseEntity.ok(boardDTO);
    }
}
