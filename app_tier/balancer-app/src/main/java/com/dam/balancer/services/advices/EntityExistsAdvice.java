package com.dam.balancer.services.advices;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityExistsException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;


@ControllerAdvice
public class EntityExistsAdvice {

	@ResponseBody
	@ExceptionHandler(EntityExistsException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	Map<String, String> userAlreadyExistHandle(EntityExistsException exception) {
		Map<String, String> error = new HashMap<>();
		error.put("generic", exception.getMessage());
		
		return error;
	}

}
