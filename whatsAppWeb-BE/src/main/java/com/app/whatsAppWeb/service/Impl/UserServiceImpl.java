package com.app.whatsAppWeb.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import com.app.whatsAppWeb.Repo.UserRepository;
import com.app.whatsAppWeb.config.TokenProvider;
import com.app.whatsAppWeb.entity.User;
import com.app.whatsAppWeb.exception.UserException;
import com.app.whatsAppWeb.request.UpdateUserRequest;
import com.app.whatsAppWeb.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TokenProvider tokenProvider;

	@Override
	public User findUserById(Integer id) throws UserException {
		Optional<User> opt = userRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new UserException("User not found with id " + id);
	}

	@Override
	public User findUserProfile(String jwt) throws UserException {
		String email = tokenProvider.getEmailFromToken(jwt);

		if (email == null) {
			throw new BadCredentialsException("Received invalid token.");
		}
		User user = userRepository.findByEmail(email);
		if (user == null) {
			throw new UserException("User not found with email " + email);
		}
		return user;
	}

	@Override
	public User updateUser(Integer userId, UpdateUserRequest updateUserRequest) throws UserException {
		User user = findUserById(userId);
		if (user == null) {
			throw new UserException("User not found with id " + userId);
		}
		if (updateUserRequest.getFullName() != null)
			user.setFullName(updateUserRequest.getFullName());

		if (updateUserRequest.getProfileImage() != null)
			user.setProfileImage(updateUserRequest.getProfileImage());
		userRepository.save(user);
		return user;
	}

	@Override
	public List<User> searchUser(String query) {
		return userRepository.serachUser(query.toLowerCase());
	}

}
