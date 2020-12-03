package com.mikirill.jwt.api.controller;

import com.mikirill.jwt.api.entity.ApplicationUser;
import com.mikirill.jwt.api.entity.AuthRequest;
import com.mikirill.jwt.api.repository.ApplicationUserRepository;
import com.mikirill.jwt.api.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @author Kir
 * Created on 23.11.2020
 */
@Controller
//@Mapping()
public class SecurityController implements ErrorController {

    @Autowired
    private ApplicationUserRepository repository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping(value = "/authenticate", consumes = "application/json")
    @ResponseBody
    public String generateToken(@RequestBody AuthRequest auth) {
        try {
            if (repository.findByUsername(auth.getUsername()) == null)
                repository.save(new ApplicationUser(auth.getUsername(), auth.getPassword()));
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(auth.getUsername(), auth.getPassword())
            );
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"token\": \"" + "bad" + "\"}";
        }
        String s = jwtUtil.generateToken(auth.getUsername());
        System.out.println("token is " + s);
        return "{\"token\": \"" + s + "\"}";
    }

    @RequestMapping("/error")
    public String handleError() {
        return "/ng/index.html";
    }

    @Override
    public String getErrorPath() {
        return null;
    }
}
