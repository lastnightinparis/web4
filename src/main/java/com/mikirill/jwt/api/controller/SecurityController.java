package com.mikirill.jwt.api.controller;

import com.mikirill.jwt.api.entity.ApplicationUser;
import com.mikirill.jwt.api.entity.AuthRequest;
import com.mikirill.jwt.api.repository.ApplicationUserRepository;
import com.mikirill.jwt.api.util.JwtUtil;
import org.aspectj.weaver.bcel.BcelAccessForInlineMunger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.ls.LSOutput;

/**
 * @author Kir
 * Created on 23.11.2020
 */
@Controller
public class SecurityController implements ErrorController {

//    private String salt = "wqe842190rqfkvqab";

    @Autowired
    private ApplicationUserRepository repository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping(value = "/authenticate", consumes = "application/json")
    @ResponseBody
    public String generateToken(@RequestBody AuthRequest auth) {
        String password = BCrypt.hashpw(auth.getPassword(), "$2a$10$llw0G6IyibUob8h5XRt9xuRczaGdCm/AiV6SSjf5v78XS824EGbh.");
        try {
            if (repository.findByUsername(auth.getUsername()) == null)
                repository.save(new ApplicationUser(auth.getUsername(), password));
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(auth.getUsername(), password)
            );
        } catch (Exception e) {
            System.out.println("non authenticate");
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
