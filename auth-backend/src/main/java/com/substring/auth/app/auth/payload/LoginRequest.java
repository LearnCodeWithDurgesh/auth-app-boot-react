package com.substring.auth.app.auth.payload;

public record LoginRequest(
        String email,
        String password
) {
}
