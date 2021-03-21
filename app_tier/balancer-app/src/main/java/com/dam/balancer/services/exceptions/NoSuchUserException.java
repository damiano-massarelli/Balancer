package com.dam.balancer.services.exceptions;

import java.util.NoSuchElementException;

public class NoSuchUserException extends NoSuchElementException {

	private static final long serialVersionUID = 1L;

	public NoSuchUserException(String message) {
		super(message);
	}
}
