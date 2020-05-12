package com.dam.balancer.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;


import com.dam.balancer.model.User;
import com.dam.balancer.services.UserService;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	/**
	 * Converts a User to the related EntityModel
	 * @param user a User to convert
	 * @return the corresponding EntityModel
	 */
	private EntityModel<User> toEntityModel(User user) {
		EntityModel<User> entityModel = new EntityModel<>(user,
				linkTo( methodOn(UserController.class).all() ).withRel("users") );
		
		return entityModel;
	}

	@GetMapping(path="/")
	public CollectionModel<EntityModel<User>> all() {
		
		List<EntityModel<User>> entityModels = userService.getAll().stream()
				.map(this::toEntityModel)
				.collect(Collectors.toList());
		
		CollectionModel<EntityModel<User>> collectionModel = new CollectionModel<>(entityModels, 
				linkTo( methodOn(UserController.class).all() ).withSelfRel());
		
		return collectionModel;
	} 

	@PostMapping(path="/")
	public EntityModel<User> add(@RequestBody String userName) {
		
		User user = userService.createUser(userName);
		
		return toEntityModel(user);
	}
}
