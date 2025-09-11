package com.example;

import com.example.entity.ERole;
import com.example.entity.Role;
import com.example.repo.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class BackendIpwrcApplication {


	public static void main(String[] args) {

		SpringApplication.run(BackendIpwrcApplication.class, args);
	}

	@Bean
	CommandLineRunner seedRoles(RoleRepository roles) {
		return args -> {
			roles.findByName(ERole.valueOf("ROLE_USER")).orElseGet(() -> roles.save(new Role(ERole.valueOf("ROLE_USER"))));
			roles.findByName(ERole.valueOf("ROLE_ADMIN")).orElseGet(() -> roles.save(new Role(ERole.valueOf("ROLE_ADMIN"))));
		};
	}



	@GetMapping(value = "/hello")
	public String hello(){

		return "hello world";
	}

}
