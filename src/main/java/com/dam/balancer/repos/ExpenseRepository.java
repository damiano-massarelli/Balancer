package com.dam.balancer.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.dam.balancer.model.Expense;
import com.dam.balancer.model.User;

public interface ExpenseRepository extends CrudRepository<Expense, Long> {

	public Expense findByTitle(String title);
	
	@Query("SELECT SUM(VALUE(d2d)) FROM Expense e join e.debtorToDebt d2d where KEY(d2d) = :user")
	public Float getTotalDebtForUser(@Param("user") User user);
	
	@Query("SELECT SUM(VALUE(d2d)) FROM Expense e join e.debtorToDebt d2d where e.creditor = :user")
	public Float getTotalCreditForUser(@Param("user") User user);
}
