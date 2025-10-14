package com.substring.auth.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication(scanBasePackages = "com.substring.auth")
@ConfigurationPropertiesScan
public class AppBackend {


    public static void main(String[] args) {
        SpringApplication.run(AppBackend.class, args);
    }

}
