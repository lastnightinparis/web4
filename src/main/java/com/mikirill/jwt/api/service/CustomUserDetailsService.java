package com.mikirill.jwt.api.service;

import com.mikirill.jwt.api.entity.ApplicationUser;
import com.mikirill.jwt.api.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * @author Kir
 * Created on 23.11.2020
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private ApplicationUserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            ApplicationUser applicationUser = repository.findByUsername(username);
            System.out.println(username + " us");
            System.out.println(applicationUser.toString());
            return new User(applicationUser.getUsername(), applicationUser.getPassword(), new ArrayList<>());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
