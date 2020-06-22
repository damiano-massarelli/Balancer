package com.dam.balancer.controllers;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dam.balancer.controllers.dtos.ExpenseDTO;
import com.dam.balancer.controllers.dtos.TransactionDTO;
import com.dam.balancer.model.Expense;
import com.dam.balancer.model.Group;
import com.dam.balancer.model.Transaction;
import com.dam.balancer.model.User;
import com.dam.balancer.model.representational.TransactionModel;
import com.dam.balancer.model.representational.TransactionModelAssembler;
import com.dam.balancer.services.ExpenseService;
import com.dam.balancer.services.GroupService;
import com.dam.balancer.services.UserService;
import com.dam.balancer.services.exceptions.BadExpenseException;
import com.dam.balancer.services.exceptions.NoSuchTransactionException;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/expenses")
public class ExpenseController {

	static float round(float value) {
		return new BigDecimal(value).setScale(2, RoundingMode.HALF_UP).floatValue();
	}
	
	@Autowired
	private ExpenseService expenseService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private GroupService groupService;
	
	@Autowired
	private TransactionModelAssembler transactionModelAssembler;
	
	private Expense createExpense(ExpenseDTO dto) {
		// set debtors and groups to empty list if they are not set
		if (dto.getDebtors() == null) {
			dto.setDebtors(new ArrayList<Long>());
		}
		if (dto.getGroups() == null) {
			dto.setGroups(new ArrayList<Long>());
		}
		
		if (dto.getAmount() < 0) {
			throw new BadExpenseException("Amount cannot be negative");
		}
		
		// at least one debtor or group must be set
		if (dto.getDebtors().size() == 0 && dto.getGroups().size() == 0) {
			throw new BadExpenseException("Select at least a debtor for this expense");
		}
		
		// total expense, round to 2 decimals
		final float total = dto.getAmount();
		float netTotal = dto.getAmount(); // total without extras
		
		final User creditor = userService.findById(dto.getCreditor());
		
		Expense expense = new Expense(dto.getTitle(), creditor, total, new Date());

		Set<Long> debtors = new HashSet<Long>(); 
		
		Map<Long, Float> debtorToExtra = dto.getDebtorToExtra();
		if (debtorToExtra == null) {
			debtorToExtra = new HashMap<Long, Float>();
		}
		for (final Long debtor : dto.getDebtors()) {
			netTotal -= Optional.ofNullable(dto.getDebtorToExtra().get(debtor)).orElse(0.0f);
			debtors.add(debtor);
		}
				
		if (netTotal < 0) {
			throw new BadExpenseException("The sum of extras is greater than the expense amount");
		}
		
		// add users from groups
		for (final Long groupId : dto.getGroups()) {
			Group group = groupService.getById(groupId);
			
			group.getMembers().stream().map(User::getId).forEach(debtors::add);
		}
		
		final float split = round(netTotal / debtors.size());
		
		for (final Long debtorId : debtors) {
			final User debtor = userService.findById(debtorId);
			
			if (!debtor.equals(creditor)) {
				final float extra = Optional.ofNullable(dto.getDebtorToExtra().get(debtorId)).orElse(0.0f);
				expense.addDebtor(debtor, round(split + extra));
			}
		}
		
		return expense;
	}
	
	/*@GetMapping(path = "/")
	public String getExpenseMainPage(Model model) {
		//populateModel(model);
		model.addAttribute("dto", new ExpenseDTO());

		return "expenses";
	}*/
	
	@DeleteMapping(path = "/transactions/")
	public void payback(@RequestBody TransactionDTO transaction) {
		User debtor = userService.findById(transaction.getFrom());
		User creditor = userService.findById(transaction.getTo());
		float amount = round(transaction.getAmount());
		
		// security check: does the transaction exist?
		Transaction paymentTransaction = new Transaction(debtor, creditor, amount);
		boolean exists = expenseService.getBalance().contains(paymentTransaction);
				
		// if payerId or receiverId do not exist the transaction won't be found as they are null
		if (exists) {
			Expense paybackExpense = new Expense("Payback", debtor, amount, new Date());
			paybackExpense.addDebtor(creditor, amount);
			expenseService.addExpense(paybackExpense);
		}
		else {
			throw new NoSuchTransactionException("Trying to payback nonexistent transaction");
		}

	}
	
	@PostMapping(path = "/")
	public CollectionModel<TransactionModel> add(@Valid @RequestBody ExpenseDTO dto) {
		Expense expense = createExpense(dto);
		this.expenseService.addExpense(expense);
		return transactionModelAssembler.toCollectionModel(expenseService.getBalance());
	}
	
	@GetMapping("/transactions/")
	public CollectionModel<TransactionModel> allTransaction() {
		return transactionModelAssembler.toCollectionModel(expenseService.getBalance());
	}
	
	/*@GetMapping(path = "/history/")
	public String showHistory(Model model) {
		model.addAttribute("expenses", expenseService.getExpenses());
		
		return "show-history";
	}
	
	@GetMapping(path = "/expenses/delete")
	public String deleteExpense(Model model, @RequestParam Long id) {
		expenseService.deleteExpense(id);
		
		model.addAttribute("expenses", expenseService.getExpenses());
		
		return "show-history";
	}*/
}
