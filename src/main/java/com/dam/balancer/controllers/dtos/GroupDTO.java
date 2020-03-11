package com.dam.balancer.controllers.dtos;

import javax.validation.constraints.NotBlank;

public class GroupDTO {
	
	@NotBlank
	private String groupName;

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	
}
