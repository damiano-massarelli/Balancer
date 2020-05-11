package com.dam.balancer.services.exceptions;

public class UserAlreadyExistsException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9126094179633536129L;

	public UserAlreadyExistsException(String message) {
		super(message);
	}

}
