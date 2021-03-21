package com.dam.balancer.repos;

import org.springframework.data.repository.CrudRepository;

import com.dam.balancer.model.Group;

public interface GroupRepository extends CrudRepository<Group, Long> {
	
	/**
	 * Retrieves a {@link Group} given its name
	 * @param name the name of the group
	 * @return the group with that name, null if it cannot be found
	 */
	public Group findByName(String name);
	
}
