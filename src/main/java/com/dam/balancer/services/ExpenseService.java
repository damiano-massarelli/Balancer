package com.dam.balancer.services;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dam.balancer.model.Expense;
import com.dam.balancer.model.Transaction;
import com.dam.balancer.model.User;
import com.dam.balancer.model.balance.AbstractBalanceCalculator;
import com.dam.balancer.repos.ExpenseRepository;


/**
 * Keeps track of all the expenses.
 * @see Expense
 */
@Service
@Transactional
public class ExpenseService {
			
	@Autowired
	private AbstractBalanceCalculator balanceCalculator;
	
	@Autowired
	private ExpenseRepository expenseRepository;
	
	/**
	 * Adds a new expense.
	 * @param expense the new expense
	 * @throws ExpenseAlreadyExistsException if there is already an expense with the given title
	 */
	public void addExpense(Expense expense) {
		expenseRepository.save(expense);
	}
	
	/**
	 * @return the balance calculator
	 */
	public AbstractBalanceCalculator getBalanceCalculator() {
		return balanceCalculator;
	}

	/**
	 * Sets the balance calculator.
	 * @param balanceCalculator the calculator to use
	 */
	public void setBalanceCalculator(AbstractBalanceCalculator balanceCalculator) {
		this.balanceCalculator = balanceCalculator;
	}

	/**
	 * Gets the total credit for a user.
	 * @param handle user's name
	 * @return the total credit for the user
	 */
	public float getTotalCreditFor(User handle) {
		return (float) getExpenses().stream()
				.filter(expense -> expense.getCreditor().equals(handle))
				.mapToDouble(Expense::getAmountDue)
				.sum();
	}
	
	/**
	 * Gets the total debt for a user
	 * @param handle user's name
	 * @return the total debt of the user
	 */
	public float getTotalDebtFor(User handle) {
		return (float) getExpenses().stream()
				.mapToDouble(expense -> expense.getDebtFor(handle))
				.sum();
	}
	
	/**
	 * Gets the net amount of money for a certain user.
	 * The amount is positive if the user is a creditor and
	 * it is negative if s/he is a debtor (overall)
	 * @return the net amount of money for a user
	 */
	public float getNetFor(User handle) {
		return this.getTotalCreditFor(handle) - this.getTotalDebtFor(handle);
	}
	
	/**
	 * @return the list of all registered expenses
	 */
	public List<Expense> getExpenses() {
		List<Expense> expenses = new LinkedList<>();
		expenseRepository.findAll().forEach(expenses::add);
		return expenses;
	}
	
	/**
	 * @return a set containing all the users involved in at least an expense.
	 */
	public Set<User> getAllUsers() {
		Set<User> allUsers = new HashSet<User>();
		
		getExpenses().forEach(expense -> {
				allUsers.add(expense.getCreditor());
				allUsers.addAll(expense.getDebtors());
		});
		
		return allUsers;
	}
	
	/**
	 * Gets the net amount of money for every user.
	 * The amount if positive if the user is a creditor or
	 * negative if s/he is a debtor (overall).
	 * @return a map where the key is the name of the user and the value is his/her net amount.
	 */
	public Map<User, Float> getAllUsersNet() {
		Map<User, Float> user2net = new HashMap<>();
		
		Set<User> allUserts = getAllUsers();
		allUserts.forEach(user -> user2net.put(user, getNetFor(user)));
		
		return user2net;
	}
	
	/**
	 * Calculates the balance: a list of transactions needed to pay all debts.
	 * @return a list of transactions needed to pay all debts
	 * @see {@link Transaction}
	 */
	public List<Transaction> getBalance() {
		return this.balanceCalculator.getBalance(getAllUsersNet());		
	}
	
	/**
	 * Deletes an expense given its id
	 * @param id the id of the expense to delete
	 */
	public void deleteExpense(Long id) {
		expenseRepository.deleteById(id);
	}
	
}
