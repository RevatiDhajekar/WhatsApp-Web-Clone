package com.app.whatsAppWeb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.whatsAppWeb.entity.Message;
import com.app.whatsAppWeb.entity.User;
import com.app.whatsAppWeb.exception.ChatException;
import com.app.whatsAppWeb.exception.MessageException;
import com.app.whatsAppWeb.exception.UserException;
import com.app.whatsAppWeb.request.sendMessageRequest;
import com.app.whatsAppWeb.response.ApiResponse;
import com.app.whatsAppWeb.service.MessageService;
import com.app.whatsAppWeb.service.UserService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

	@Autowired
	private MessageService messageService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/create")
	public ResponseEntity<Message> sendMessage(@RequestBody sendMessageRequest req,
			 @RequestHeader("Authorization") String jwt) throws UserException, ChatException{
		User user = userService.findUserProfile(jwt);
		req.setUserId(user.getId());
		Message msg = messageService.sendMessage(req);
		return new ResponseEntity<Message>(msg,HttpStatus.OK);
	}
	
	@GetMapping("/chat/{chatId}")
	public ResponseEntity<List<Message>> getChatsMessages(@PathVariable("chatId") Integer chatId,
			@RequestHeader("Authorization") String jwt) throws UserException, ChatException{
		User user = userService.findUserProfile(jwt);
		List<Message> list = messageService.getChatsMessages(chatId, user);
		return new ResponseEntity<List<Message>>(list,HttpStatus.OK);
	}
	@DeleteMapping("/{messageId}")
	public ResponseEntity<ApiResponse> deleteMessage(@PathVariable("messageId") Integer messageId,
			@RequestHeader("Authorization") String jwt) throws UserException,MessageException {
		User user = userService.findUserProfile(jwt);
		messageService.deleteMessage(messageId, user);
		ApiResponse resp = new ApiResponse("message deleted successfully", false);
		return new ResponseEntity<ApiResponse>(resp,HttpStatus.OK);
	}
}
