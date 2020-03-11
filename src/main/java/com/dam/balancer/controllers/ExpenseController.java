package com.dam.balancer.controllers;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.dam.balancer.controllers.dtos.ExpenseDTO;
import com.dam.balancer.model.Expense;
import com.dam.balancer.model.Group;
import com.dam.balancer.model.Transaction;
import com.dam.balancer.model.User;
import com.dam.balancer.services.ExpenseService;
import com.dam.balancer.services.GroupService;
import com.dam.balancer.services.UserService;

@Controller
@RequestMapping(path = "/")
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
	
	private void populateModel(Model model) {
		model.addAttribute("users", userService.getAll());
		model.addAttribute("groups", groupService.getAll());
		model.addAttribute("transactions", expenseService.getBalance());
	}
	
	private Expense createExpense(ExpenseDTO dto, BindingResult result) {
		// set debtors and groups to empty list if they are not set
		if (dto.getDebtors() == null) {
			dto.setDebtors(new ArrayList<Long>());
		}
		if (dto.getGroups() == null) {
			dto.setGroups(new ArrayList<Long>());
		}
		
		// at least one debtor or group must be set
		if (dto.getDebtors().size() == 0 && dto.getGroups().size() == 0) {
			result.rejectValue("debtors", "errors.noDebtors", "No debtors added");
			return null;
		}
		
		// total expense, round to 2 decimals
		final float total = dto.getAmount();
		float netTotal = dto.getAmount(); // total without extras
		
		final User creditor = userService.findById(dto.getCreditor());
		
		if (creditor == null) {
			result.rejectValue("creditor", "errors.cannotFindCreditor", "Creditor not set");
			return null;
		}
		
		Expense expense = new Expense(dto.getTitle(), creditor, total, new Date());

		Set<Long> debtors = new HashSet<Long>(); 
		
		for (final Long debtor : dto.getDebtors()) {
			netTotal -= Optional.ofNullable(dto.getDebtorToExtra().get(debtor)).orElse(0.0f);
			debtors.add(debtor);
		}
				
		if (netTotal < 0) {
			result.rejectValue("debtorToExtra", "errors.tooManyExtras", "Too many extras");
			return null;
		}
		
		// add users from groups
		for (final Long groupId : dto.getGroups()) {
			Group group = groupService.getById(groupId);
			if (group == null) {
				result.rejectValue("groups", "errors.groupNotFount", "Group does not exist");
				return null;
			}
			
			group.getMembers().stream().map(User::getId).forEach(debtors::add);
		}
		
		final float split = round(netTotal / debtors.size());
		
		for (final Long debtorId : debtors) {
			final User debtor = userService.findById(debtorId);
			if (debtor == null) {
				result.rejectValue("debtors", "errors.cannotFindDebtor", "Cannot find debtor");
				return null;
			}
			
			if (!debtor.equals(creditor)) {
				final float extra = Optional.ofNullable(dto.getDebtorToExtra().get(debtorId)).orElse(0.0f);
				expense.addDebtor(debtor, round(split + extra));
			}
		}
		
		return expense;
	}
	
	@GetMapping(path = "/")
	public String getExpenseMainPage(Model model) {
		populateModel(model);
		model.addAttribute("dto", new ExpenseDTO());

		return "expenses";
	}
	
	@GetMapping(path = "/expenses/payback")
	public String payback(Model model, @RequestParam Long payerId, Long receiverId, Float amount) {
		User payer = userService.findById(payerId);
		User receiver = userService.findById(receiverId);
		
		// security check: does the transaction exist?
		Transaction paymentTransaction = new Transaction(receiver, payer, amount);
		boolean exists = expenseService.getBalance().contains(paymentTransaction);
				
		// if payerId or receiverId do not exist the transaction won't be found as they are null
		if (exists) {
			Expense paybackExpense = new Expense("Payback", receiver, amount, new Date());
			paybackExpense.addDebtor(payer, round(amount));
			expenseService.addExpense(paybackExpense);
		}
		
		model.addAttribute("dto", new ExpenseDTO());
		populateModel(model);
		
		return "expenses";
	}
	
	@PostMapping(path = "/expenses/doAdd")
	public String addExpense(Model model, @ModelAttribute(name = "dto") @Valid ExpenseDTO dto, BindingResult result) {
		model.addAttribute("dto", dto); // keep this dto to report errors
		
		if (!result.hasErrors()) {
			Expense expense = createExpense(dto, result);
			if (expense != null) {
				this.expenseService.addExpense(expense);
			}
		}
				
		populateModel(model);
		
		return "expenses";
	}
	
	@GetMapping(path = "/history/")
	public String showHistory(Model model) {
		model.addAttribute("expenses", expenseService.getExpenses());
		
		return "show-history";
	}
	
	@GetMapping(path = "/expenses/delete")
	public String deleteExpense(Model model, @RequestParam Long id) {
		expenseService.deleteExpense(id);
		
		model.addAttribute("expenses", expenseService.getExpenses());
		
		return "show-history";
	}
}
