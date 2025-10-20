package com.example.auth;

import com.example.auth.jwt.AuthEntryPointJwt;
import com.example.auth.jwt.AuthTokenFilter;
import com.example.service.UserDetailsServiceImpl;
import jakarta.servlet.Filter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


// WebSecurityConfig.java
@Configuration
@EnableWebSecurity
// In Spring Security 6+, prefer:
@org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity(
        securedEnabled = true, jsr250Enabled = true, prePostEnabled = true
)
public class WebSecurityConfig {

    private final AuthEntryPointJwt unauthorizedHandler;
    private final UserDetailsServiceImpl userDetailsService;

    public WebSecurityConfig(AuthEntryPointJwt unauthorizedHandler,
                             UserDetailsServiceImpl userDetailsService) {
        this.unauthorizedHandler = unauthorizedHandler;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider p = new DaoAuthenticationProvider();
        p.setUserDetailsService(userDetailsService);
        p.setPasswordEncoder(passwordEncoder());
        return p;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration cfg) throws Exception {
        return cfg.getAuthenticationManager();
    }

    @Bean
    public Filter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    // ✅ Let Spring Security answer preflight with 200 + CORS headers
    @Bean
    public org.springframework.security.web.SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})                                   // <--- IMPORTANT
                .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // preflight
                        .requestMatchers("/api/auth/**", "/api/test/**", "/api/minicon/**", "/error").permitAll()
                        .anyRequest().authenticated()
                );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    // ✅ Define allowed origin(s), headers, methods
    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        var cfg = new org.springframework.web.cors.CorsConfiguration();
        // Allow your dev front-end origins. Include both localhost and 127.0.0.1 just in case.
        cfg.setAllowedOrigins(java.util.List.of("http://localhost:4200", "http://127.0.0.1:4200"));
        cfg.setAllowedMethods(java.util.List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
        cfg.setAllowedHeaders(java.util.List.of("Content-Type","Authorization"));
        // If you send cookies (withCredentials: true), set this true and DO NOT use '*'
        cfg.setAllowCredentials(false); // set true only if you actually use cookies

        var source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }
}
