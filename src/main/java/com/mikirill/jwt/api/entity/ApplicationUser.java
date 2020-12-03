package com.mikirill.jwt.api.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

import javax.persistence.*;

/**
 * @author Kir
 * Created on 23.11.2020
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "app_users")
public class ApplicationUser {
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private int id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;

    public ApplicationUser(int id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public ApplicationUser(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
