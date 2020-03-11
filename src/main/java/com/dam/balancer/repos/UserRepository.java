package com.dam.balancer.repos;

import org.springframework.data.repository.CrudRepository;

import com.dam.balancer.model.User;

public interface UserRepository extends CrudRepository<User, Long> {

	/**
	 * Finds a {@link User} given its name
	 * @param name the name of the user
	 * @return the user, null if it cannot be found
	 */
	public User findByName(String name);
	
}
