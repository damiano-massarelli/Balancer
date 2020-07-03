package com.dam.balancer.model.representational;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.dam.balancer.controllers.UserController;
import com.dam.balancer.model.User;

/**
 * Converts a User to its HATEOAS compatible representation.
 */
@Component
public class UserModelAssembler implements RepresentationModelAssembler<User, EntityModel<User>> {

	@Override
	public EntityModel<User> toModel(User user) {
		EntityModel<User> entityModel = new EntityModel<>(user,
				linkTo( methodOn(UserController.class).all() ).withRel("users") );
		
		return entityModel;
	}

	@Override
	public CollectionModel<EntityModel<User>> toCollectionModel(Iterable<? extends User> entities) {
		// adds link to self, since it is not supported by the default method
		CollectionModel<EntityModel<User>> collection = RepresentationModelAssembler.super.toCollectionModel(entities);
		collection.add( linkTo( methodOn(UserController.class).all() ).withSelfRel() );
		return collection;
	}
}
