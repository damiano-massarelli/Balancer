package com.dam.balancer.services.exceptions;

import java.util.NoSuchElementException;

public class NoSuchExpenseException extends NoSuchElementException {

	private static final long serialVersionUID = 1L;

	public NoSuchExpenseException(String message) {
		super(message);
	}

}
