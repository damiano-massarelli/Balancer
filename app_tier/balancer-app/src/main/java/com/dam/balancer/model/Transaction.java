package com.dam.balancer.model;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;

/**
 * Money transaction between two {@link User}s.
 */
public class Transaction {
	
	private User from;
	
	private User to;
	
	private float amount;
	
	/**
	 * Constructor.
	 * @param from the user giving money
	 * @param to the user receiving money
	 * @param amount the amount of money transferred
	 */
	public Transaction(User from, User to, float amount) {
		this.from = from;
		this.to = to;
		
		// rounded to 2 decimals
		this.amount = new BigDecimal(amount).setScale(2, RoundingMode.HALF_UP).floatValue();
	}

	/**
	 * @return the user giving money
	 */
	public User getFrom() {
		return from;
	}

	/**
	 * @return the user receiving money
	 */
	public User getTo() {
		return to;
	}

	/**
	 * @return the amount of money transferred
	 */
	public float getAmount() {
		return amount;
	}
	
	@Override
	public String toString() {
		DecimalFormatSymbols otherSymbols = new DecimalFormatSymbols();
		otherSymbols.setDecimalSeparator('.');
		otherSymbols.setGroupingSeparator('.'); 
		DecimalFormat floatFormatter = new DecimalFormat("#0.00", otherSymbols);
		
		return this.from + " owes " + this.to + " " + floatFormatter.format(this.amount); 
	}
	
	@Override
	public boolean equals(Object other) {
		if (this.getClass() == other.getClass()) {
			Transaction rhs = (Transaction) other;
			return from.equals(rhs.from) && to.equals(rhs.to) && amount == rhs.amount;
		}
		
		return false;
	}
	
}
