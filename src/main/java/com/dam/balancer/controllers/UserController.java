package com.dam.balancer.controllers;

import java.util.Collection;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dam.balancer.controllers.dtos.UserDTO;
import com.dam.balancer.controllers.dtos.UserSummaryDTO;
import com.dam.balancer.services.ExpenseService;
import com.dam.balancer.services.UserAlreadyExistsException;
import com.dam.balancer.services.UserService;


@Controller
@RequestMapping(path = "/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private ExpenseService expenseService;

	private Collection<UserSummaryDTO> getUserSummaries() {
		Collection<UserSummaryDTO> userSummaries = userService.getAll().stream().map(user -> {
			// todo set the current balance
			return new UserSummaryDTO(user.getId(), user.getName(), expenseService.getNetFor(user));
		}).collect(Collectors.toList());

		return userSummaries;
	}

	@GetMapping(path="/")
	public String showUsers(Model model) {
		model.addAttribute("summaries", getUserSummaries());
		model.addAttribute("dto", new UserDTO());
		return "show-all-users";
	} 

	@PostMapping(path="/doAdd")
	public String doAddUser(Model model, @ModelAttribute("dto") @Valid UserDTO dto, BindingResult bindingResult) {

		if (!bindingResult.hasErrors()) {
			try {
				userService.createUser(dto.getName().trim());
			} 
			catch (UserAlreadyExistsException e) {
				bindingResult.rejectValue("name", "errors.userAlreadyExists", "User Already Exists");
			}
		}

		model.addAttribute("dto", dto);
		model.addAttribute("summaries", getUserSummaries());

		return "show-all-users";
	}
}
