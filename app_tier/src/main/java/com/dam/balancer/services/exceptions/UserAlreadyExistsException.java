package com.dam.balancer.services.exceptions;

import javax.persistence.EntityExistsException;

public class UserAlreadyExistsException extends EntityExistsException {

	private static final long serialVersionUID = -9126094179633536129L;

	public UserAlreadyExistsException(String message) {
		super(message);
	}

}
