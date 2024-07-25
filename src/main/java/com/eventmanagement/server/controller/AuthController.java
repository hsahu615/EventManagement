package com.eventmanagement.server.controller;

import com.eventmanagement.server.entity.User;
import com.eventmanagement.server.models.JwtRequest;
import com.eventmanagement.server.models.JwtResponse;
import com.eventmanagement.server.service.TokenBlacklistService;
import com.eventmanagement.server.service.UserService;
import com.eventmanagement.server.utility.JwtHelper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;

    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    @Autowired
    private UserService userService;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(HttpServletResponse httpServletResponse, @RequestBody JwtRequest request) {
        this.doAuthenticate(request.getEmail(), request.getPassword());

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.helper.generateToken(userDetails);

        Cookie cookie = new Cookie("token", token);
        cookie.setMaxAge(2 * 60 * 60); // 1 day
        cookie.setSecure(true);
        cookie.setPath("/");

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .username(userDetails.getUsername())
                .roles(userDetails.getAuthorities())
                .build();
        httpServletResponse.addCookie(cookie);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            tokenBlacklistService.addTokenToBlacklist(jwtToken);
        }
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/create")
    public String user(@RequestBody User user) {
        return userService.createUser(user);
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> exceptionHandler() {
        return new ResponseEntity<>("Credentials Invalid!!!", HttpStatus.UNAUTHORIZED);
    }

}
