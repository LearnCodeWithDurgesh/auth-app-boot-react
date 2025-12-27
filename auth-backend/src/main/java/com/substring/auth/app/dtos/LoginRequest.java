package com.substring.auth.app.dtos;

public record LoginRequest(
        String email,
        String password
) {
}
