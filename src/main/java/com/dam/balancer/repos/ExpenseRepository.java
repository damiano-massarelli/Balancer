package com.dam.balancer.repos;

import org.springframework.data.repository.CrudRepository;

import com.dam.balancer.model.Expense;

public interface ExpenseRepository extends CrudRepository<Expense, Long> {

	Expense findByTitle(String title);
	
}
