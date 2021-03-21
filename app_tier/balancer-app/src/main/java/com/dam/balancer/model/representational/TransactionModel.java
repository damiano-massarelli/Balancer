package com.dam.balancer.model.representational;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.RepresentationModel;

import com.dam.balancer.model.Transaction;
import com.dam.balancer.model.User;

/**
 * HATEOAS counterpart of {@link Transaction}
 */
public class TransactionModel extends RepresentationModel<TransactionModel> {

	private EntityModel<User> from;
	private EntityModel<User> to;
	
	private float amount;

	public TransactionModel(EntityModel<User> from, EntityModel<User> to, float amount) {
		this.from = from;
		this.to = to;
		this.amount = amount;
	}

	public EntityModel<User> getFrom() {
		return from;
	}

	public void setFrom(EntityModel<User> from) {
		this.from = from;
	}

	public EntityModel<User> getTo() {
		return to;
	}

	public void setTo(EntityModel<User> to) {
		this.to = to;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}
}
