package com.app.whatsAppWeb.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.app.whatsAppWeb.entity.User;
import com.app.whatsAppWeb.exception.UserException;
import com.app.whatsAppWeb.request.UpdateUserRequest;
import com.app.whatsAppWeb.response.ApiResponse;
import com.app.whatsAppWeb.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwtToken) throws UserException {
		User user = userService.findUserProfile(jwtToken);
		return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	}

	@GetMapping("/searchUser")
	public ResponseEntity<List<User>> searchUser(@RequestParam("name") String name,@RequestHeader("Authorization") String jwtToken) throws UserException{
		User user = userService.findUserProfile(jwtToken);
		List<User> userList = new ArrayList<>();
		if(user != null) {
		userList = userService.searchUser(name);
		}
		return new ResponseEntity<List<User>>(userList ,  HttpStatus.OK);
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse> updateUser(@RequestBody UpdateUserRequest updateUserRequest ,
								@RequestHeader("Authorization") String jwtToken) throws UserException{
		User user = userService.findUserProfile(jwtToken);					
		userService.updateUser(user.getId(), updateUserRequest);
		ApiResponse res = new ApiResponse("User updated succesfully", true);
		return new ResponseEntity<ApiResponse>(res , HttpStatus.ACCEPTED);
	}
	
}
