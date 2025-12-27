package com.substring.auth.app.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProjectConfig {


    @Bean
    public ModelMapper modelMapper()
    {
        return new ModelMapper();
    }


}
