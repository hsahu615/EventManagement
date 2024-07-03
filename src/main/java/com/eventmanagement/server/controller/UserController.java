package com.eventmanagement.server.controller;


import com.eventmanagement.server.entity.User;
import com.eventmanagement.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> user() {
        return this.userService.getAllUsers();
    }

    @PostMapping("/create")
    public String user(@RequestBody User user) {
        return userService.createUser(user);
    }
}
