package com.substring.auth.app.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletResponse;

@Component
public class CookieService {

    private final String refreshCookieName;
    private final boolean cookieSecure;
    private final String cookieSameSite;
    private final String cookieDomain;

    public CookieService(
            @Value("${security.jwt.refresh-cookie-name:refresh_token}") String refreshCookieName,
            @Value("${security.jwt.cookie-secure:true}") boolean cookieSecure,
            @Value("${security.jwt.cookie-same-site:Lax}") String cookieSameSite,
            @Value("${security.jwt.cookie-domain:}") String cookieDomain
    ) {
        this.refreshCookieName = refreshCookieName;
        this.cookieSecure = cookieSecure;
        this.cookieSameSite = cookieSameSite;
        this.cookieDomain = cookieDomain;
    }

    /** Expose cookie name so controllers can read the same cookie consistently */
    public String getRefreshCookieName() {
        return refreshCookieName;
    }

    /** Attach secure HttpOnly refresh cookie (unchanged behavior) */
    public void attachRefreshCookie(HttpServletResponse response, String value, int maxAgeSeconds) {
        ResponseCookie.ResponseCookieBuilder builder = ResponseCookie.from(refreshCookieName, value)
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(maxAgeSeconds)
                .sameSite(cookieSameSite);

        if (cookieDomain != null && !cookieDomain.isBlank()) {
            builder.domain(cookieDomain);
        }

        ResponseCookie cookie = builder.build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    /** Clear refresh cookie (unchanged behavior) */
    public void clearRefreshCookie(HttpServletResponse response) {
        ResponseCookie.ResponseCookieBuilder builder = ResponseCookie.from(refreshCookieName, "")
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .maxAge(0)
                .sameSite(cookieSameSite);

        if (cookieDomain != null && !cookieDomain.isBlank()) {
            builder.domain(cookieDomain);
        }

        ResponseCookie cookie = builder.build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    /** Add anti-caching headers (unchanged behavior) */
    public void addNoStoreHeaders(HttpServletResponse response) {
        response.setHeader(HttpHeaders.CACHE_CONTROL, "no-store");
        response.setHeader("Pragma", "no-cache");
    }
}