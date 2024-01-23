package com.tags.server.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tags.server.models.User;

public interface UserRepository extends MongoRepository<User, String> {
	public User findByUsername( String username );
	public List<User> findByRoles( String... role );
}