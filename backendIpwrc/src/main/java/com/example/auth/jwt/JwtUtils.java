package com.example.auth.jwt;

import com.example.service.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${bezkoder.app.jwtSecret}")
    private String jwtSecret;

    @Value("${bezkoder.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    private Key key() {
        // Raw string sleutel (veilig: gebruik een minimaal 32+ char random string)
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    // Genereren
    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Lezen/valideren
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            // Log minimale debug info (géén volledige secret)
            logger.info("JWT debug: alg=HS256, secretLen={}, first5='{}'",
                    jwtSecret != null ? jwtSecret.length() : -1,
                    jwtSecret != null && jwtSecret.length() >= 5 ? jwtSecret.substring(0, 5) : "n/a");

            Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authToken);
            return true;
        } catch (io.jsonwebtoken.security.WeakKeyException e) {
            logger.error("JWT secret is te kort/zwak (min. 32 chars)", e);
        } catch (io.jsonwebtoken.security.SignatureException e) {
            logger.error("Ongeldige JWT signature (verkeerde secret/algoritme?)", e);
        } catch (MalformedJwtException e) {
            logger.error("Ongeldige JWT token", e);
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is verlopen", e);
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token wordt niet ondersteund", e);
        } catch (IllegalArgumentException e) {
            logger.error("Lege JWT claims / null token", e);
        }
        return false;
    }
}