package com.app.whatsAppWeb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.whatsAppWeb.entity.Chat;
import com.app.whatsAppWeb.entity.User;
import com.app.whatsAppWeb.exception.ChatException;
import com.app.whatsAppWeb.exception.UserException;
import com.app.whatsAppWeb.request.GroupChatRequest;
import com.app.whatsAppWeb.request.SingleChatRequest;
import com.app.whatsAppWeb.response.ApiResponse;
import com.app.whatsAppWeb.service.ChatService;
import com.app.whatsAppWeb.service.UserService;

@RestController
@RequestMapping("api/chats")
public class ChatController {

	@Autowired
	private ChatService chatService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/single")
	public ResponseEntity<Chat> createChat(@RequestBody SingleChatRequest singleChatRequest,
			@RequestHeader("Authorization") String jwtToken) throws UserException{
		User reqUser = userService.findUserProfile(jwtToken);
		Chat chat = chatService.createChat(reqUser, singleChatRequest.getUserId());
		return new ResponseEntity<Chat>(chat , HttpStatus.OK);
	}
	
	@PostMapping("/group")
	public ResponseEntity<Chat> createGroup(@RequestBody GroupChatRequest groupChatRequest,
			@RequestHeader("Authorization") String jwtToken) throws UserException{
		User reqUser = userService.findUserProfile(jwtToken);
		Chat chat = chatService.createGroup(groupChatRequest, reqUser);
		return new ResponseEntity<Chat>(chat , HttpStatus.OK);
	}
	
	@GetMapping("/getAllChats")
	public ResponseEntity<List<Chat>> findAllChatsByUserId(@RequestHeader("Authorization") String  jwtToken) throws UserException{
		User user = userService.findUserProfile(jwtToken);
		List<Chat> chats = chatService.findAllChatsByUserId(user.getId());
		return new ResponseEntity<List<Chat>>(chats , HttpStatus.OK);
	}
	
	@GetMapping("/findChat/{chatId}")
	public ResponseEntity<Chat> findChatById(@PathVariable("chatId") Integer chatId) throws ChatException{
		Chat chat = chatService.findChatById(chatId);
		return new ResponseEntity<Chat>(chat , HttpStatus.OK);
	}
	
	@PutMapping("/addUser{userId}")
	public ResponseEntity<Chat> addUserToGroup(@PathVariable("userId")Integer userId ,
			        @PathVariable("chatId") Integer chatId,
			        @RequestHeader("Authorization") String jwtToken) throws UserException, ChatException{
		User reqUser = userService.findUserProfile(jwtToken);
		Chat chat = chatService.addUserToGroup(userId, chatId , reqUser);
		return new ResponseEntity<Chat>(chat , HttpStatus.OK);
	}
	
	@PutMapping("/removeUser/{userId}")
	public ResponseEntity<Chat> removeUserFromGroup(@PathVariable("userId")Integer userId ,
			        @PathVariable("chatId") Integer chatId,
			        @RequestHeader("Authorization") String jwtToken) throws UserException, ChatException{
		User reqUser = userService.findUserProfile(jwtToken);
		Chat chat = chatService.removeFromGroup(userId, chatId , reqUser);
		return new ResponseEntity<Chat>(chat , HttpStatus.OK);
	}

	@PutMapping("/renameGroup/{grpname}/{chatId}")
	public ResponseEntity<Chat> renameGroup(@PathVariable("grpname")String grpname ,
			        @PathVariable("chatId") Integer chatId,
			        @RequestHeader("Authorization") String jwtToken) throws UserException, ChatException{
		User reqUser = userService.findUserProfile(jwtToken);
		Chat chat = chatService.renameGroup(grpname, chatId , reqUser);
		return new ResponseEntity<Chat>(chat , HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteChat/{chatId}")
	public ResponseEntity<ApiResponse> deleteChat(@PathVariable("chatId") Integer chatId,
			        @RequestHeader("Authorization") String jwtToken) throws UserException, ChatException{
		User reqUser = userService.findUserProfile(jwtToken);
		chatService.deleteChat(chatId , reqUser.getId());
		ApiResponse res = new ApiResponse("Chat deleted succesfully", true);
		return new ResponseEntity<>(res , HttpStatus.OK);
	}
	
}
