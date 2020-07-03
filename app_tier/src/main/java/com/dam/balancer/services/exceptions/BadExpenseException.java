package com.dam.balancer.services.exceptions;

public class BadExpenseException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public BadExpenseException(String message) {
		super(message);
	}
	
}
