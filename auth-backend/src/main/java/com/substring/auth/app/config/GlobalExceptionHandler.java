package com.substring.auth.app.config;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler {

    @ExceptionHandler({
            UsernameNotFoundException.class,
            BadCredentialsException.class,
            CredentialsExpiredException.class,
            ExpiredJwtException.class,
            JwtException.class,
            AuthenticationException.class,

    })
    public ResponseEntity<ApiError> handleAuthExceptions(Exception ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        if (ex instanceof DisabledException) {
            status = HttpStatus.FORBIDDEN;
        } else if (ex instanceof LockedException) {
            status = HttpStatus.LOCKED;
        } else if (ex instanceof BadCredentialsException) {
            status = HttpStatus.BAD_REQUEST;
        } else if (ex instanceof AuthenticationException) {
            status = HttpStatus.UNAUTHORIZED;
        }
        System.out.println(status.value());
        System.out.println(ex.getClass().getName());
        ApiError body = ApiError.of(status, "Authentication error", safeMessage(ex), request.getRequestURI());
        return ResponseEntity.status(status)
                .header(HttpHeaders.CACHE_CONTROL, "no-store")
                .header("Pragma", "no-cache")
                .body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        String detail = buildValidationMessage(ex);
        ApiError body = ApiError.of(HttpStatus.BAD_REQUEST, "Validation failed", detail, request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .header(HttpHeaders.CACHE_CONTROL, "no-store")
                .header("Pragma", "no-cache")
                .body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleOthers(Exception ex, HttpServletRequest request) {
        IO.println(ex.getClass().getName());
        ApiError body = ApiError.of(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", "An unexpected error occurred", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .header(HttpHeaders.CACHE_CONTROL, "no-store")
                .header("Pragma", "no-cache")
                .body(body);
    }

    private String buildValidationMessage(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> String.format("%s", friendlyMessage(fe)))
                .collect(Collectors.toList());
        return String.join(", ", errors);
    }

    private String friendlyMessage(FieldError fe) {
        String defaultMessage = fe.getDefaultMessage();
        return defaultMessage != null ? defaultMessage : "is invalid";
    }

    private String safeMessage(Exception ex) {
        // Avoid leaking sensitive details in prod
        String msg = ex.getMessage();
        return (msg == null || msg.isBlank()) ? "Invalid or expired credentials" : msg;
    }

    public record ApiError(
            OffsetDateTime timestamp,
            int status,
            String error,
            String message,
            String path
    ) {
        public static ApiError of(HttpStatus status, String error, String message, String path) {
            return new ApiError(OffsetDateTime.now(ZoneOffset.UTC), status.value(), error, message, path);
        }
    }
}
