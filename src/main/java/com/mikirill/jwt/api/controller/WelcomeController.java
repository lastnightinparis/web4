package com.mikirill.jwt.api.controller;

import com.mikirill.jwt.api.entity.AuthRequest;
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
public class WelcomeController implements ErrorController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/authenticate")
    public String generateToken(@RequestBody AuthRequest auth) throws Exception {
        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(auth.getUsername(), auth.getPassword())
            );
        } catch (Exception e) {
            throw new Exception("invalid user");
        }
        return jwtUtil.generateToken(auth.getUsername());
    }

    @RequestMapping("/error")
    public String handleError() {
        return "ng/index.html";
    }

    @Override
    public String getErrorPath() {
        return null;
    }
}
