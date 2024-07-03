package com.eventmanagement.server.controller;


import com.eventmanagement.server.entity.User;
import com.eventmanagement.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public String user(@RequestBody User user) {
        return userService.createUser(user);
    }
}
