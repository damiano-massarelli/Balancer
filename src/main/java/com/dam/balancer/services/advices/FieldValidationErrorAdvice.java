package com.dam.balancer.services.advices;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class FieldValidationErrorAdvice {
	
	static class FieldErrorReport {
		private String fieldName;
		
		private String errorMessage;

		public FieldErrorReport(String fieldName, String errorMessage) {
			this.fieldName = fieldName;
			this.errorMessage = errorMessage;
		}

		public String getFieldName() {
			return fieldName;
		}

		public void setFieldName(String fieldName) {
			this.fieldName = fieldName;
		}

		public String getErrorMessage() {
			return errorMessage;
		}

		public void setErrorMessage(String error) {
			this.errorMessage = error;
		}
		
	}
	
	@ResponseBody
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	Map<String, List<FieldErrorReport>> fieldErrorHandle(MethodArgumentNotValidException exception) {
		Map<String, List<FieldErrorReport>> errorNameToDetails = new HashMap<>();
		List<FieldErrorReport> errors = exception.getBindingResult().getAllErrors().stream().map((error) -> {
	        FieldErrorReport errorReport = new FieldErrorReport(((FieldError) error).getField(), error.getDefaultMessage());
	        return errorReport;
	    }).collect(Collectors.toList());
	    
		errorNameToDetails.put("fieldErrors", errors);
		return errorNameToDetails;
	}
	
}
