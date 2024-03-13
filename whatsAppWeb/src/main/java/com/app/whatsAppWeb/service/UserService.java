package com.app.whatsAppWeb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.whatsAppWeb.entity.User;
import com.app.whatsAppWeb.exception.UserException;
import com.app.whatsAppWeb.request.UpdateUserRequest;

@Service
public interface UserService {
	
	public User findUserById(Integer id) throws UserException;
	
	public User findUserProfile(String jwt) throws UserException;
	
	public User updateUser(Integer userId , UpdateUserRequest updateUserRequest) throws UserException;
	
	public List<User> searchUser(String query);
}
