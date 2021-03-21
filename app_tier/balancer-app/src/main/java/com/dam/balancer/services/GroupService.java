package com.dam.balancer.services;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dam.balancer.model.Group;
import com.dam.balancer.model.User;
import com.dam.balancer.repos.GroupRepository;
import com.dam.balancer.services.exceptions.GroupAlreadyExistsException;
import com.dam.balancer.services.exceptions.NoSuchGroupException;

@Service
@Transactional
public class GroupService {

	@Autowired
	private GroupRepository groupRepository;
	
	/**
	 * Gets a group given its id
	 * @param id the id of the group
	 * @return the group with the given id
	 * @throws NoSuchGroupException if there is no {@link Group} with the given id
	 */
	public Group getById(Long id) {
		return groupRepository.findById(id).<NoSuchGroupException>orElseThrow(() -> {
			throw new NoSuchGroupException("Cannot find group with id " + id);
		});
	}
	
	/**
	 * Gets a group given its name
	 * @param name the name of the group
	 * @return the group with the given name, null if it does not exist
	 */
	public Group getByName(String name) {
		return groupRepository.findByName(name);
	}
	
	public Iterable<Group> findAll() {
		return groupRepository.findAll();
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
			throw new GroupAlreadyExistsException("Group '" + groupName + "' already exists");
		}
		
		Group group = new Group(groupName);
		users.forEach(group::addMember);
		
		groupRepository.save(group);
		
		return group;
	}
	
}
