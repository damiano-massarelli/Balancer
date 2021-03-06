package com.dam.balancer.controllers.dtos;

import javax.validation.constraints.NotBlank;

/**
 *  DTO to register a user.
 */
public class UserDTO {

	@NotBlank(message = "{com.balancer.messages.user.empty-name}")
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
