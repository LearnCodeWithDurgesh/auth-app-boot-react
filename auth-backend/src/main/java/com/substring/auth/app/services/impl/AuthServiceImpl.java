package com.substring.auth.app.services.impl;

import com.substring.auth.app.config.AppConstants;
import com.substring.auth.app.dtos.UserDto;
import com.substring.auth.app.entities.Role;
import com.substring.auth.app.repositories.RoleRepository;
import com.substring.auth.app.services.AuthService;
import com.substring.auth.app.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private  final PasswordEncoder passwordEncoder;


    @Override
    public UserDto registerUser(UserDto userDto) {
        //logic
        //verify email
        //verify password
        //default roles
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));


        return userService.createUser(userDto);
    }
}
