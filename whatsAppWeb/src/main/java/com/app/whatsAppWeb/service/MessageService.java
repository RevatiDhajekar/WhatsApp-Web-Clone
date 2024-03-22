package com.app.whatsAppWeb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.whatsAppWeb.entity.Message;
import com.app.whatsAppWeb.entity.User;
import com.app.whatsAppWeb.exception.ChatException;
import com.app.whatsAppWeb.exception.MessageException;
import com.app.whatsAppWeb.exception.UserException;
import com.app.whatsAppWeb.request.sendMessageRequest;

@Service
public interface MessageService {

	public Message sendMessage(sendMessageRequest req) throws UserException, ChatException;
	
	public List<Message> getChatsMessages(Integer chatId ,User reqUser) throws UserException,ChatException;
	
	public Message findMessageById(Integer messageId) throws MessageException;
	
	public void deleteMessage(Integer messageId ,User reqUser) throws UserException,MessageException;
}
