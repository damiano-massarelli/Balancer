package com.dam.balancer.services;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dam.balancer.model.Group;
import com.dam.balancer.model.User;
import com.dam.balancer.repos.GroupRepository;
import com.dam.balancer.services.exceptions.GroupAlreadyExistsException;

@Service
@Transactional
public class GroupService {

	@Autowired
	private GroupRepository groupRepository;
	
	/**
	 * Gets a group given its id
	 * @param id the id of the group
	 * @return the group with the given id, null if it does not exist
	 */
	public Group getById(Long id) {
		return groupRepository.findById(id).orElse(null);
	}
	
	/**
	 * Gets a group given its name
	 * @param name the name of the group
	 * @return the group with the given name, null if it does not exist
	 */
	public Group getByName(String name) {
		return groupRepository.findByName(name);
	}
	
	public Collection<Group> getAll() {
		List<Group> groups = new LinkedList<Group>();
		groupRepository.findAll().forEach(groups::add);
		return groups;
	}
	
	/**
	 * Creates and saves a new group
	 * @param groupName the name of the group
	 * @param users the users belonging to the group
	 * @return the newly created group
	 * @throws GroupAlreadyExistsException if a group with that name already exists
	 */
	public Group createGroup(String groupName, Set<User> users) {
		if (groupRepository.findByName(groupName) != null) {
			throw new GroupAlreadyExistsException();
		}
		
		Group group = new Group(groupName);
		users.forEach(group::addMember);
		
		groupRepository.save(group);
		
		return group;
	}
	
}
