package com.dam.balancer.model.representational;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.dam.balancer.controllers.GroupController;
 import com.dam.balancer.model.Group;

/**
 * Converts a {@link Group} to its HATEOAS compatible representation
 */
 @Component
public class GroupModelAssembler implements RepresentationModelAssembler<Group, EntityModel<Group>> {

	@Override
	public EntityModel<Group> toModel(Group group) {
		EntityModel<Group> entityModel = new EntityModel<>(group,
				linkTo( methodOn(GroupController.class).all() ).withRel("groups") );
		
		return entityModel;
	}

	@Override
	public CollectionModel<EntityModel<Group>> toCollectionModel(Iterable<? extends Group> entities) {
		// adds link to self, since it is not supported by the default method
		CollectionModel<EntityModel<Group>> collection = RepresentationModelAssembler.super.toCollectionModel(entities);
		collection.add( linkTo( methodOn(GroupController.class).all() ).withSelfRel() );
		return collection;
	}
}
