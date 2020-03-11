package com.dam.balancer.controllers.dtos;

import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ExpenseDTO {
	
	@NotBlank
	private String title;
	
	@NotNull
	private Long creditor;
	
	@NotNull
	private Float amount;
	
	@NotNull
	private List<Long> debtors;
	
	private List<Long> groups;
	
	@NotNull
	private Map<Long, Float> debtorToExtra;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Long getCreditor() {
		return creditor;
	}

	public void setCreditor(Long creditor) {
		this.creditor = creditor;
	}

	public Float getAmount() {
		return amount;
	}

	public void setAmount(Float amount) {
		this.amount = amount;
	}


	public List<Long> getDebtors() {
		return debtors;
	}

	public void setDebtors(List<Long> debtors) {
		this.debtors = debtors;
	}

	public Map<Long, Float> getDebtorToExtra() {
		return debtorToExtra;
	}

	public void setDebtorToExtra(Map<Long, Float> debtorToExtra) {
		this.debtorToExtra = debtorToExtra;
	}

	public List<Long> getGroups() {
		return groups;
	}

	public void setGroups(List<Long> groups) {
		this.groups = groups;
	}
	
}
