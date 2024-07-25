package com.eventmanagement.server.models;


import com.eventmanagement.server.entity.Role;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import java.lang.reflect.Array;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class JwtResponse {

    private String jwtToken;
    private String username;
    private Collection<? extends GrantedAuthority> roles;
}
