package com.dam.balancer.model.representational;

import java.util.Date;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.RepresentationModel;

import com.dam.balancer.model.Expense;
import com.dam.balancer.model.User;

/**
 * HATEOAS counterpart of {@link Expense}
 */
public class ExpenseModel extends RepresentationModel<ExpenseModel> {
	
	static class DebtorToDebtModel {
		private EntityModel<User> debtor;
		private float debt;
		
		public DebtorToDebtModel(EntityModel<User> debtor, float debt) {
			this.debtor = debtor;
			this.debt = debt;
		}
		
		public EntityModel<User> getDebtor() {
			return debtor;
		}
		public void setDebtor(EntityModel<User> debtor) {
			this.debtor = debtor;
		}
		public float getDebt() {
			return debt;
		}
		public void setDebt(float debt) {
			this.debt = debt;
		}
	}
	
	private Long id;
	
	private String title;
	
	private EntityModel<User> creditor;
	
	private CollectionModel<DebtorToDebtModel> debtorToDebt;
	
	private Date date;
	
	private float amount;

	public ExpenseModel(Long id, String title, EntityModel<User> creditor, CollectionModel<DebtorToDebtModel> debtorToDebt, Date date, float amount) {
		this.id = id;
		this.title = title;
		this.creditor = creditor;
		this.debtorToDebt = debtorToDebt;
		this.amount = amount;
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public EntityModel<User> getCreditor() {
		return creditor;
	}

	public void setCreditor(EntityModel<User> creditor) {
		this.creditor = creditor;
	}

	public CollectionModel<DebtorToDebtModel> getDebtorToDebt() {
		return debtorToDebt;
	}

	public void setDebtorToDebt(CollectionModel<DebtorToDebtModel> debtorToDebt) {
		this.debtorToDebt = debtorToDebt;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
}
