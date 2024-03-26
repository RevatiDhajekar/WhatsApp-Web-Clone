package com.app.whatsAppWeb.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.whatsAppWeb.entity.User;

public interface UserRepository extends JpaRepository<User,Integer>{

	public User findByEmail(String email);
	
	@Query("SELECT u FROM User u WHERE u.fullName LIKE %:query% OR u.email LIKE %:query%")
	public List<User> serachUser(@Param("query") String query);
}
 