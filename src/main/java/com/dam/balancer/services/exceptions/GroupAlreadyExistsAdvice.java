package com.dam.balancer.services.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GroupAlreadyExistsAdvice {

	@ResponseBody
	@ExceptionHandler(GroupAlreadyExistsException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	Map<String, String> groupAlreadyExistHandle(GroupAlreadyExistsException exception) {
		Map<String, String> error = new HashMap<>();
		error.put("generic", exception.getMessage());
		
		return error;
	}

}
