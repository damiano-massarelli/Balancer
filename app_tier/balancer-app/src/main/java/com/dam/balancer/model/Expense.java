package com.dam.balancer.model;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyJoinColumn;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Used to keep track of an expense for which a single
 * creditor paid. Other users can be added as debtors 
 * if they owe money to the creditor for this expense.
 */
@Entity
public class Expense {

	@Id
	@GeneratedValue
	private Long id;
	
	private String title;
	
	@ManyToOne
	private User creditor;
	
	private float amount;
	
	// maps the name of a debtor to its debt for this expense
	@ElementCollection
	@MapKeyJoinColumn(name="debtor_id")
	@Column(name="debt")
	@CollectionTable(name="expense_debtor_to_debt", joinColumns=@JoinColumn(name="expense_id"))
	private Map<User, Float> debtorToDebt;
	
	@Temporal(TemporalType.DATE)
	private Date date;

	public Expense() {
		this("", null, 0.0f, null);
	}
	
	/**
	 * Constructor.
	 * @param title	title of this expense. Can be null.
	 * @param creditor name of the creditor: the user who paid for this expense
	 * @param amount total amount of the expense
	 * @param date date of the expense
	 */
	public Expense(String title, User creditor, float amount, Date date) {
		this.title = title;
		this.creditor = creditor;
		this.date = date;
		this.debtorToDebt = new HashMap<>();
		this.amount = amount;
	}
	
	/**
	 * @return this expense's id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id for this expense
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Adds a debtor to this expense if not already present.
	 * @param debtor the name of the debtor
	 * @param amountDue the amount due to the creditor of this expense
	 */
	public void addDebtor(User debtor, float amountDue) {
		if (this.debtorToDebt.containsKey(debtor))
			return;
		
		this.debtorToDebt.put(debtor, amountDue);
	}
	
	public Map<User, Float> getDebtorToDebt() {
		return Collections.unmodifiableMap(debtorToDebt);
	}
	
	/**
	 * @return the title of this expense
	 */
	public String getTitle() {
		return title;
	}
	
	/**
	 * @return the creditor of this expense
	 */
	public User getCreditor() {
		return creditor;
	}
	
	/**
	 * @return the debtors of this expense
	 */
	public Set<User> getDebtors() {
		return this.debtorToDebt.keySet();
	}

	/**
	 * @return the date of this expense
	 */
	public Date getDate() {
		return date;
	}
	
	/**
	 * @return the total amount due to the creditor of this expense
	 */
	public float getAmountDue() {
		return this.debtorToDebt.values().stream().reduce((a, b) -> a + b).orElse(0.0f);
	}
	
	/**
	 * @return the total amount of this expense
	 */
	public float getAmount() {
		return amount;
	}
	
	/**
	 * Whether an user is a debtor for this expense
	 * @param handle the user
	 * @return true if s/he is a debtor, false otherwise
	 */
	public boolean isDebtor(User handle) {
		return this.debtorToDebt.containsKey(handle);
	}
	
	/**
	 * Whether an user is the creditor for this expense
	 * @param handle the user
	 * @return true if s/he is the creditor, false otherwise
	 */
	public boolean isCreditor(User handle) {
		return this.getCreditor().equals(handle);
	}
	
	/**
	 * Gets the debt of a certain user.
	 * @param handle the user
	 * @return the debt of the given user, 0 if s/he is not present.
	 */
	public float getDebtFor(User handle) {
		if (!isDebtor(handle))
			return 0.0f;
		
		return this.debtorToDebt.get(handle);
	}
}
