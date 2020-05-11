package com.dam.balancer.controllers;

import java.util.HashSet;
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

import com.dam.balancer.controllers.dtos.GroupDTO;
import com.dam.balancer.model.User;
import com.dam.balancer.services.GroupService;
import com.dam.balancer.services.UserService;
import com.dam.balancer.services.exceptions.GroupAlreadyExistsException;

@Controller
@RequestMapping(path = "/groups")
public class GroupController {
	
	@Autowired
	private GroupService groupService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping(path = "/")
	public  String showGroups(Model model) {
		model.addAttribute("users", userService.getAll());
		model.addAttribute("dto", new GroupDTO());
		model.addAttribute("groups", groupService.getAll());
		
		return "show-all-groups";
	}
	
	@PostMapping(path = "/doAdd")
	public String addGroup(Model model, @ModelAttribute("dto") @Valid GroupDTO dto, BindingResult result,
			@RequestParam(value = "members" , required = false) Long[] members) {
		
		Set<User> users = new HashSet<User>();
		
		if (members != null) {
			for (Long memberId : members) {
				User user = userService.findById(memberId);
				if (user == null) {
					result.rejectValue("groupName", "errors.userNotFound", "User not found");
				}
				users.add(user);
			}
		} else {
			result.rejectValue("groupName", "errors.emptyGroup", "Group cannot be empty");
		}
				
		if (!result.hasErrors()) {
			try {
				// create and store a new group
				groupService.createGroup(dto.getGroupName(), users);
			} catch (GroupAlreadyExistsException e) {
				result.rejectValue("groupName", "errors.groupAlreadyExists", "Group Already Exists");
			}
		}

		model.addAttribute("users", userService.getAll());
		model.addAttribute("dto", dto);
		model.addAttribute("groups", groupService.getAll());

		return "show-all-groups";
	}
}
