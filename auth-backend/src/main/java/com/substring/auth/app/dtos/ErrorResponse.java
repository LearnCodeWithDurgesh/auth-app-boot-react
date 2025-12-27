package com.substring.auth.app.dtos;

import org.springframework.http.HttpStatus;

public record ErrorResponse(
        String message,
        HttpStatus status,
        int statusCode

) {
}
