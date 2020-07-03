package com.dam.balancer.services.advices;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.dam.balancer.services.exceptions.BadExpenseException;


@ControllerAdvice
public class BadExpenseAdvice {

	@ResponseBody
	@ExceptionHandler(BadExpenseException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	Map<String, String> userAlreadyExistHandle(BadExpenseException exception) {
		Map<String, String> error = new HashMap<>();
		error.put("generic", exception.getMessage());
		
		return error;
	}

}
