package com.dam.balancer.services.exceptions;

import javax.persistence.EntityExistsException;

public class GroupAlreadyExistsException extends EntityExistsException {

	private static final long serialVersionUID = 2009114609977178786L;

	public GroupAlreadyExistsException(String message) {
		super(message);
	}

}
