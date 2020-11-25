package com.mikirill.jwt.api;

import com.mikirill.jwt.api.entity.ApplicationUser;
import com.mikirill.jwt.api.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class DemoApplication {

	@Autowired
	private ApplicationUserRepository repository;


	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
