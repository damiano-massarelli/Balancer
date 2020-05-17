package com.dam.balancer.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dam.balancer.controllers.dtos.UserDTO;
import com.dam.balancer.model.User;
import com.dam.balancer.model.representational.UserModelAssembler;
import com.dam.balancer.services.UserService;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserModelAssembler userModelAssembler;

	@GetMapping(path="/")
	public CollectionModel<EntityModel<User>> all() {
		return userModelAssembler.toCollectionModel(userService.findAll());
	} 

	@PostMapping(path="/")
	public EntityModel<User> add(@Valid @RequestBody UserDTO dto) {
		
		User user = userService.createUser(dto.getName());
		
		return userModelAssembler.toModel(user);
	}
}
