package com.dam.balancer.services.exceptions;

import java.util.NoSuchElementException;

public class NoSuchTransactionException extends NoSuchElementException {

	private static final long serialVersionUID = 1L;

	public NoSuchTransactionException(String message) {
		super(message);
	}
}
