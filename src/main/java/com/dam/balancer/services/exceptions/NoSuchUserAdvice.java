package com.dam.balancer.services.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class NoSuchUserAdvice {

	@ResponseBody
	@ExceptionHandler(NoSuchUserException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	Map<String, String> noSuchUsersHandle(NoSuchUserException exception) {
		Map<String, String> error = new HashMap<>();
		error.put("generic", exception.getMessage());
		
		return error;
	}

}
