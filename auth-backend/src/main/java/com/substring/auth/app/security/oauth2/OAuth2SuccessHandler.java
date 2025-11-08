package com.substring.auth.app.security.oauth2;

import com.substring.auth.app.auth.model.Provider;
import com.substring.auth.app.auth.model.RefreshToken;
import com.substring.auth.app.auth.model.User;
import com.substring.auth.app.auth.repository.RefreshTokenRepository;
import com.substring.auth.app.auth.service.AuthService;
import com.substring.auth.app.auth.service.CookieService;
import com.substring.auth.app.auth.service.UserService;
import com.substring.auth.app.security.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.Random;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {


    private final JwtService jwtService;

    private final UserService userService;

    private final CookieService cookieService;

    private final RefreshTokenRepository refreshTokenRepository;


    private final Logger logger = org.slf4j.LoggerFactory.getLogger(OAuth2SuccessHandler.class);


    @Value("${app.auth.success-redirect}")
    private String fronendRedirectURL;

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {


        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // Identifying provider
        String registrationId = "unknown";
        if (authentication instanceof OAuth2AuthenticationToken token) {
            registrationId = token.getAuthorizedClientRegistrationId();
        }

        logger.debug("OAuth2 user attributes: {}", oAuth2User.getAttributes());


        User user;
        switch (registrationId) {
            case "google" -> {
                // Google standard claims
                String googleId = oAuth2User.getAttributes().getOrDefault("sub", "").toString();
                String email = oAuth2User.getAttributes().getOrDefault("email", "").toString(); // may be null if not granted
                String name = oAuth2User.getAttributes().getOrDefault("name", "").toString();
                String image = oAuth2User.getAttributes().getOrDefault("picture", "").toString();
                user = userService.saveUserIfNotExit(googleId, email, name, image, Provider.GOOGLE);
            }
            case "github" -> {
                System.out.println(oAuth2User.getAttributes());
                String githubId = String.valueOf(oAuth2User.getAttributes().getOrDefault("id", ""));
                String email = (String) oAuth2User.getAttributes().get("email");
                String name = (String) oAuth2User.getAttributes().get("login");
                if (email == null) {
                    email = name + "@github.com";
                }
                String avatar_url = oAuth2User.getAttributes().getOrDefault("avatar_url", "").toString();
                user = userService.saveUserIfNotExit(githubId, email, name, avatar_url, Provider.GITHUB);
            }
            default -> {
                // Fallback: try generic
                throw new RuntimeException("Unsupported provider: " + registrationId);
            }
        }


//        String githubId = oAuth2User.getAttributes().getOrDefault("id", "").toString();
//        String email = oAuth2User.getAttributes().getOrDefault("email", "").toString();
//        String name = oAuth2User.getAttributes().getOrDefault("login", "").toString();
//        String image = oAuth2User.getAttributes().getOrDefault("avatar_url", "").toString();
//        logger.debug("OAuth2 user email: {}", email);
//        logger.debug("OAuth2 user name: {}", name);


//        User user = userService.saveGithubUserIfNotExist(githubId, email, name);


        // Issue tokens
        String jti = UUID.randomUUID().toString();

        RefreshToken refreshToken1 = RefreshToken.builder()
                .jti(jti)
                .user(user)
                .revoked(false)
                .createdAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .build();

        refreshTokenRepository.save(refreshToken1);

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user, jti);
        cookieService.attachRefreshCookie(response, refreshToken, (int) jwtService.getRefreshTtlSeconds());
        response.sendRedirect(fronendRedirectURL);


    }
}
