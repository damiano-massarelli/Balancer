package com.dam.balancer.model.representational;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.RepresentationModel;

import com.dam.balancer.model.User;

public class GroupModel extends RepresentationModel<GroupModel> {
	
	private String name;
	
	private CollectionModel<EntityModel<User>> members;

	public GroupModel(String name, CollectionModel<EntityModel<User>> members) {
		this.name = name;
		this.members = members;
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
