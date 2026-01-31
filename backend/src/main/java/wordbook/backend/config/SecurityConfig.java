package wordbook.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import wordbook.backend.filter.JWTFilter;
import wordbook.backend.filter.LoginFilter;
import wordbook.backend.util.JWTUtil;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final AuthenticationSuccessHandler loginSuccessHandler;
    private final JWTUtil jwtUtil;
    public SecurityConfig(AuthenticationSuccessHandler loginSuccessHandler,JWTUtil jwtUtil) {
        this.loginSuccessHandler = loginSuccessHandler;
        this.jwtUtil = jwtUtil;
    }
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) {
        return  authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http, AuthenticationManager authenticationManager) throws Exception{
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST,  "/user").permitAll()
                        .anyRequest().authenticated()
                );
        http
                .csrf(AbstractHttpConfigurer::disable);
        http
                .cors(AbstractHttpConfigurer::disable);
        http
                .formLogin(AbstractHttpConfigurer::disable);
        http
                .httpBasic(AbstractHttpConfigurer::disable);
        http
                .addFilterAt(new LoginFilter(authenticationManager,loginSuccessHandler), UsernamePasswordAuthenticationFilter.class);

        http
                .addFilterBefore(new JWTFilter(jwtUtil),LoginFilter.class);
        http
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }
}
