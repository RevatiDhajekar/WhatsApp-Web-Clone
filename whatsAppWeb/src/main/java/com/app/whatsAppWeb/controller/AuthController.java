package com.app.whatsAppWeb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.whatsAppWeb.Repo.UserRepository;
import com.app.whatsAppWeb.config.TokenProvider;
import com.app.whatsAppWeb.entity.User;
import com.app.whatsAppWeb.exception.UserException;
import com.app.whatsAppWeb.response.AuthResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private TokenProvider tokenProvider;

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUser(@Valid @RequestBody User user) throws UserException{
		String email = user.getEmail();
		String password = user.getPassword();
		User isUser = userRepository.findByEmail(email);
		if(isUser != null) {
			throw new UserException("Email is already registered");
		}
		User createUser = new User();
		createUser.setEmail(email);
		createUser.setFullName(user.getFullName());
		createUser.setPassword(passwordEncoder.encode(user.getPassword()));
		createUser.setProfileImage(user.getProfileImage());
		userRepository.save(createUser);	
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenProvider.generateToken(authentication);
		
		AuthResponse res = new AuthResponse(jwt, true);
		return new ResponseEntity<AuthResponse>(res , HttpStatus.ACCEPTED);
	}
	
	

}
