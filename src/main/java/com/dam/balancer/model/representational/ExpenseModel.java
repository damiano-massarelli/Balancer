package com.dam.balancer.model.representational;

import java.util.Map;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.RepresentationModel;

import com.dam.balancer.model.Expense;
import com.dam.balancer.model.User;

/**
 * HATEOAS counterpart of {@link Expense}
 */
public class ExpenseModel extends RepresentationModel<ExpenseModel> {
	
	private Long id;
	
	private String title;
	
	private Map<EntityModel<User>, Float> debtorToAmount;
	
	private float amount;

	public ExpenseModel(Long id, String title, Map<EntityModel<User>, Float> debtorToAmount, float amount) {
		this.id = id;
		this.title = title;
		this.debtorToAmount = debtorToAmount;
		this.amount = amount;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Map<EntityModel<User>, Float> getDebtorToAmount() {
		return debtorToAmount;
	}

	public void setDebtorToAmount(Map<EntityModel<User>, Float> debtorToAmount) {
		this.debtorToAmount = debtorToAmount;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}
		
}
