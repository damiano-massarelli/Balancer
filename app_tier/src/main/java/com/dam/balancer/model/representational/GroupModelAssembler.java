package com.dam.balancer.model.representational;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.dam.balancer.controllers.GroupController;
 import com.dam.balancer.model.Group;

/**
 * Converts a {@link Group} to its HATEOAS compatible representation
 */
 @Component
public class GroupModelAssembler implements RepresentationModelAssembler<Group, GroupModel> {
	
	@Autowired
	UserModelAssembler userAssembler;
	 
	@Override
	public GroupModel toModel(Group group) {
		GroupModel groupModel = new GroupModel(group.getId(), group.getName(), userAssembler.toCollectionModel( group.getMembers() ));
		
		groupModel.add( linkTo( methodOn(GroupController.class).all() ).withRel("groups") );
		
		return groupModel;
	}

	@Override
	public CollectionModel<GroupModel> toCollectionModel(Iterable<? extends Group> entities) {
		// adds link to self, since it is not supported by the default method
		CollectionModel<GroupModel> collection = RepresentationModelAssembler.super.toCollectionModel(entities);
		collection.add( linkTo( methodOn(GroupController.class).all() ).withSelfRel() );
		return collection;
	}
}
