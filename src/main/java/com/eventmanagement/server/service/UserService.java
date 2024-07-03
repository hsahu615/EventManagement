package com.eventmanagement.server.service;

import com.eventmanagement.server.entity.Role;
import com.eventmanagement.server.entity.User;
import com.eventmanagement.server.repo.RoleRepository;
import com.eventmanagement.server.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public String createUser(User user) {
        user.setUserId(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        List<Role> roles = user.getRoles();
        for (Role role: roles) {
            Role r = new Role();
            r.setRoleId(UUID.randomUUID().toString());
            r.setName(role.getName());
//            roleRepository.save(r);
        }
        userRepository.save(user);
        return user.getUserId();
    }

}
