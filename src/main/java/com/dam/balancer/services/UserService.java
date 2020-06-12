package com.dam.balancer.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dam.balancer.model.User;
import com.dam.balancer.repos.UserRepository;
import com.dam.balancer.services.exceptions.NoSuchUserException;
import com.dam.balancer.services.exceptions.UserAlreadyExistsException;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	/**
	 * Creates and saves a new user
	 * @param name the name of the user
	 * @return the newly created user
	 * @throws UserAlreadyExistsException if a user with the given name already exists
	 */
	public User createUser(String name) {
		if (userRepository.findByName(name) != null) {
			throw new UserAlreadyExistsException("User '" + name + "' already exists.");
		}
		
		User user = new User(name);
		userRepository.save(user);
		
		return user;
	}
	
	/**
	 * Retrieves a {@link User} given its id.
	 * @param id the id of the user
	 * @return the corresponding User
	 */
	public User findById(Long id) {
		return userRepository.findById(id).orElseThrow(() -> { 
			return new NoSuchUserException("Cannot find user with id " + id);
		});
	}
	
	/**
	 * @return the collection of all available users
	 */
	public Iterable<User> findAll() {
		return userRepository.findAll();
	}
	
}