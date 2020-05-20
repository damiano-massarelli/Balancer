package com.dam.balancer.controllers;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dam.balancer.controllers.dtos.GroupDTO;
import com.dam.balancer.model.Group;
import com.dam.balancer.model.User;
import com.dam.balancer.model.representational.GroupModel;
import com.dam.balancer.model.representational.GroupModelAssembler;
import com.dam.balancer.services.GroupService;
import com.dam.balancer.services.UserService;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/groups")
public class GroupController {
	
	@Autowired
	private GroupService groupService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private GroupModelAssembler groupModelAssembler;
	
	@GetMapping(path = "/")
	public CollectionModel<GroupModel> all() {
		return groupModelAssembler.toCollectionModel(groupService.findAll());
	}
	
	@PostMapping(path = "/")
	public GroupModel add(@Valid @RequestBody GroupDTO dto) {
		
		Set<User> users = new HashSet<User>();
		
		for (Long memberId : dto.getUserIds()) {
			User user = userService.findById(memberId);
			if (user == null) {
				//result.rejectValue("groupName", "errors.userNotFound", "User not found");
			}
			users.add(user);
		}
		
		Group group = groupService.createGroup(dto.getName(), users);
		return groupModelAssembler.toModel(group);
	}
}
