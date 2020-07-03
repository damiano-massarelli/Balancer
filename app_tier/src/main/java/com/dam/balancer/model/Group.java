package com.dam.balancer.model;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.springframework.hateoas.server.core.Relation;

/**
 * A group of users.
 */
@Entity
@Table(name="balancer_group")
@Relation(collectionRelation = "members")
public class Group {
	
	@Id
	@GeneratedValue
	private Long id;

	private String name;
	
	@ManyToMany
	private Set<User> members;
	
	/**
	 * Constructor.
	 * @param name the name of this group
	 */
	public Group(String name) {
		this.name = name;
		this.members = new HashSet<>();
	}
	
	/**
	 * Constructor.
	 */
	public Group() {
		this.name = "";
		this.members = new HashSet<>();
	}
	
	/**
	 * Adds a new member to this group if possible.
	 * @param memeber the name of the member to add
	 * @return true if the member was not part of the group, false otherwise
	 */
	public boolean addMember(User memeber) {
		if (this.members.contains(memeber))
			return false;
		
		this.members.add(memeber);
		return true;
	}

	/**
	 * @return the name of the group
	 */
	public String getName() {
		return name;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return an unmodifiable set of the members
	 */
	public Set<User> getMembers() {
		return Collections.unmodifiableSet(this.members);
	}

	/**
	 * Deletes a member if present in this Group.
	 * @param handle member's name
	 * @return true if the user was found, false otherwise.
	 */
	public boolean deleteMember(User handle) {
		return this.members.remove(handle);
	}
	
	
}
