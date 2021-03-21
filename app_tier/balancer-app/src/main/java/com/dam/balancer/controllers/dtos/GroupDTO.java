package com.dam.balancer.controllers.dtos;

import java.util.Collection;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class GroupDTO {
	
	@NotBlank(message = "{com.balancer.messages.group.emtpy-name}")
	private String name;
	
	@NotNull(message = "{com.balancer.messages.group.empty-users}")
	@NotEmpty(message = "{com.balancer.messages.group.empty-users}")
	private Collection<Long> userIds;

	public String getName() {
		return name;
	}

	public void setName(String groupName) {
		this.name = groupName;
	}

	public Collection<Long> getUserIds() {
		return userIds;
	}

	public void setUserIds(Collection<Long> userIds) {
		this.userIds = userIds;
	}
	
}
