package com.dam.balancer.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dam.balancer.model.User;
import com.dam.balancer.services.UserService;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping(path="/")
	public Collection<User> all() {
		try {
			Thread.sleep(10000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return userService.getAll();
	} 

	@PostMapping(path="/")
	public User add(@RequestBody String userName) {
		
		User user;
		
		user = userService.createUser(userName);
		
		return user;
	}
}
