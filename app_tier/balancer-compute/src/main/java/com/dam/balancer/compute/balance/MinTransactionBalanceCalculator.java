package com.dam.balancer.compute.balance;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.dam.balancer.common.TransactionData;

/**
 * Finds the list of transactions needed to pay all debt minimizing
 * the number of transactions.
 * This seems to be a NP-complete problem similar to the <a href="https://en.wikipedia.org/wiki/Bin_packing_problem">bin packing problem</a>.
 * The difference is that the volume
 * of the bins can be variable and the total difference between the volumes to fit in the bins and
 * the overall volumes of the bins is 0.
 */
@Component
public class MinTransactionBalanceCalculator extends AbstractBalanceCalculator {

	/*
	 * Makes of a deep copy of the given list removing elements for which
	 * getAmount is 0
	 */
	private static List<NetOwnedByUser> copyAndClear(List<NetOwnedByUser> list) {
		List<NetOwnedByUser> copy = new ArrayList<>(list.size());
		
		list.forEach(net -> {
			if (net.getAmount() != 0) { // get rid of zeros
				NetOwnedByUser netCopy = new NetOwnedByUser(net.getUser(), net.getAmount());
				copy.add(netCopy);
			}
		});
		
		return copy;
	}
	
	/*
	 * This is a recursive method that finds the balance with
	 * the minimum number of transactions trying every possible solution
	 * and selecting the shortest one. May be slow if the number of creditors and debtors is high.
	 */
	private List<TransactionData> getOptimalBalance(List<NetOwnedByUser> creditors, List<NetOwnedByUser> debtors) {
		List<TransactionData> shortest = new ArrayList<TransactionData>();
		
		if (debtors.size() == 0) return shortest;
		
		for (int i = 0; i < creditors.size(); ++i) {
			List<NetOwnedByUser> clearedCreditors = copyAndClear(creditors);
			List<NetOwnedByUser> clearedDebtors = copyAndClear(debtors);
			
			// copyAndClear might have removed some elements
			if (i >= clearedCreditors.size() || clearedDebtors.isEmpty()) break;
			
			NetOwnedByUser creditor = clearedCreditors.get(i);
			NetOwnedByUser debtor = clearedDebtors.get(0);
			
			float exchangedAmount = Math.min(creditor.getAmount(), -debtor.getAmount());
			creditor.addAmount(-exchangedAmount);
			debtor.addAmount(exchangedAmount);
			
			List<TransactionData> childrenTransaction = getOptimalBalance(clearedCreditors, clearedDebtors);
			
			// choose the shortest of transactions
			if (i == 0 || childrenTransaction.size() + 1 < shortest.size()) {
				shortest = childrenTransaction;
				shortest.add(new TransactionData(debtor.getUser(), creditor.getUser(), exchangedAmount));
			}
		}
		
		return shortest;
	}
	
	@Override
	protected List<TransactionData> calculateBalance() {
		return getOptimalBalance(copyAndClear(getCreditors()), copyAndClear(getDebtors()));
	}

}
