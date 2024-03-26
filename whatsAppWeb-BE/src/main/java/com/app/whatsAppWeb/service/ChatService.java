package com.app.whatsAppWeb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.whatsAppWeb.entity.Chat;
import com.app.whatsAppWeb.entity.User;
import com.app.whatsAppWeb.exception.ChatException;
import com.app.whatsAppWeb.exception.UserException;
import com.app.whatsAppWeb.request.GroupChatRequest;

@Service
public interface ChatService {

	public Chat createChat(User reqUser , Integer userId) throws UserException;
	
	public Chat findChatById(Integer chatId) throws ChatException;
	
	public List<Chat> findAllChatsByUserId(Integer userId) throws UserException;
	
	public Chat createGroup(GroupChatRequest request , User reqUser) throws UserException;
	
	public Chat addUserToGroup(Integer userId , Integer chatId ,  User reqUser) throws UserException , ChatException;
	
	public Chat renameGroup(String grpName , Integer chatId,  User reqUser) throws UserException , ChatException;
	
	public Chat removeFromGroup(Integer userId , Integer chatId , User reqUser)throws UserException , ChatException;
	
	public void deleteChat(Integer chatId , Integer userId)throws UserException , ChatException;
}
