package com.dam.balancer.services.exceptions;

import java.util.NoSuchElementException;

public class NoSuchGroupException extends NoSuchElementException {

	private static final long serialVersionUID = 1L;

	public NoSuchGroupException(String message) {
		super(message);
	}
	
}
