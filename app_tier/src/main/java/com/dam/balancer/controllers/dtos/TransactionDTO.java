package com.dam.balancer.controllers.dtos;

public class TransactionDTO {
	private Long from = 0l;
	private Long to = 0l;
	private Float amount = 0.0f;
	
	public TransactionDTO() {}

	public TransactionDTO(Long from, Long to, Float amount) {
		this.from = from;
		this.to = to;
		this.amount = amount;
	}

	public Long getFrom() {
		return from;
	}

	public void setFrom(Long from) {
		this.from = from;
	}

	public Long getTo() {
		return to;
	}

	public void setTo(Long to) {
		this.to = to;
	}

	public Float getAmount() {
		return amount;
	}

	public void setAmount(Float amount) {
		this.amount = amount;
	}
	
}
