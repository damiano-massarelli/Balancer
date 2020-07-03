package com.dam.balancer.model.balance;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.dam.balancer.model.Transaction;
import com.dam.balancer.model.User;


/**
 * Abstract class for balance calculators.
 * A balance calculator always provides a {@link #getBalance} method whereby
 * it is possible to calculate a list of {@link Transaction}s to pay all debts.<br />
 * Calculating the balance with the minimum number of transactions
 * can be slow. This abstract class is therefore provided so that different
 * algorithm can be developed to calculate the balance.
 */
public abstract class AbstractBalanceCalculator {

	/**
	 * The net amount of money owned by a user
	 * negative if the user is a debtor, positive if s/he is a creditor.
	 */
	protected static class NetOwnedByUser {
		private User user;
		private float amount;

		public NetOwnedByUser(User user, float amount) {
			this.user = user;
			this.amount = amount;
		}

		public float getAmount() {
			return amount;
		}

		public void setAmount(float amount) {
			this.amount = amount;
		}

		public void addAmount(float delta) {
			this.amount += delta;
		}

		public User getUser() {
			return user;
		}
	}

	private List<NetOwnedByUser> creditors;
	private List<NetOwnedByUser> debtors;

	// Divides users in two lists: creditors and debtors
	private void createCreditorsAndDebtors(Map<User, Float> user2net) {

		this.creditors = new ArrayList<>(user2net.size() / 2);
		this.debtors = new ArrayList<>(user2net.size() / 2);

		for (Map.Entry<User, Float> entry : user2net.entrySet()) {

			NetOwnedByUser userNet = new NetOwnedByUser(entry.getKey(), entry.getValue());

			if (entry.getValue() > 0)
				this.creditors.add(userNet);
			else if (entry.getValue() < 0)  // a credit/debt of 0 is useless
				this.debtors.add(userNet);
		}
	}

	/**
	 * @return list of transactions needed to pay all debts.
	 */
	protected abstract List<Transaction> calculateBalance();

	/**
	 * @return the list of creditors
	 */
	protected List<NetOwnedByUser> getCreditors() {
		return this.creditors;
	}

	/**
	 * @return the list of debtors
	 */
	protected List<NetOwnedByUser> getDebtors() {
		return this.debtors;
	}

	/**
	 * Gets the balance: a list of {@link Transaction}s to pay all debts.
	 * @param user2net a map where the key is the user and the value is his/her net credit (positive if credit, negative if debt)
	 * @return a list of transaction needed to pay all debts.
	 */
	public List<Transaction> getBalance(Map<User, Float> user2net) {
		this.createCreditorsAndDebtors(user2net);

		return this.calculateBalance();
	}

}
