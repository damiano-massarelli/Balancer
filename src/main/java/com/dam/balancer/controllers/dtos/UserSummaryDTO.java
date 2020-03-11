package com.dam.balancer.controllers.dtos;

/**
 * DTO to show a user summary.
 * 
 * It is composed by the id, name and the total debt or credit of the user.
 */
public class UserSummaryDTO {
	
	private Long id;
	
	private String name;
	
	private float credit;
	
	public UserSummaryDTO(Long id, String name, float credit) {
		this.id = id;
		this.name = name;
		this.credit = credit;
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

	public float getCredit() {
		return credit;
	}

	public void setCredit(float credit) {
		this.credit = credit;
	}
}
