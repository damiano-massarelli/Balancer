package com.dam.balancer.model.representational;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.RepresentationModel;

import com.dam.balancer.model.Group;
import com.dam.balancer.model.User;

/**
 * HATEOAS counterpart of {@link Group}.
 */
public class GroupModel extends RepresentationModel<GroupModel> {
	
	private Long id;
	private String name;
	
	private CollectionModel<EntityModel<User>> members;

	public GroupModel(Long id, String name, CollectionModel<EntityModel<User>> members) {
		this.id = id;
		this.name = name;
		this.members = members;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public CollectionModel<EntityModel<User>> getMembers() {
		return members;
	}

	public void setMembers(CollectionModel<EntityModel<User>> members) {
		this.members = members;
	}
	
}
