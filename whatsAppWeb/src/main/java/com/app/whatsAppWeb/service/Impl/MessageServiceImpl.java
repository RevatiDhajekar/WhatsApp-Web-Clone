package com.app.whatsAppWeb.service.Impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.whatsAppWeb.Repo.MessageRepository;
import com.app.whatsAppWeb.entity.Chat;
import com.app.whatsAppWeb.entity.Message;
import com.app.whatsAppWeb.entity.User;
import com.app.whatsAppWeb.exception.ChatException;
import com.app.whatsAppWeb.exception.MessageException;
import com.app.whatsAppWeb.exception.UserException;
import com.app.whatsAppWeb.request.sendMessageRequest;
import com.app.whatsAppWeb.service.ChatService;
import com.app.whatsAppWeb.service.MessageService;
import com.app.whatsAppWeb.service.UserService;
@Service
public class MessageServiceImpl implements MessageService {
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private UserService userService;

	@Autowired
	private ChatService chatService;
	
	@Override
	public Message sendMessage(sendMessageRequest req) throws UserException, ChatException {
		User user = userService.findUserById(req.getUserId());
		Chat chat = chatService.findChatById(req.getChatId());
		
		Message msg = new Message();
		msg.setChat(chat);
		msg.setContent(req.getContent());
		msg.setUser(user);
		msg.setTimeStamp(LocalDateTime.now());
		messageRepository.save(msg);
		return msg;
	}

	@Override
	public List<Message> getChatsMessages(Integer chatId ,User reqUser) throws UserException, ChatException {
		Chat chat = chatService.findChatById(chatId);
		if(!chat.getUsers().contains(reqUser)) {
			throw new UserException("You are not member of this chat." + chat.getId());
		}
		return messageRepository.findByChatId(chatId);
	}

	@Override
	public Message findMessageById(Integer messageId) throws MessageException {
		Optional<Message> opt = messageRepository.findById(messageId);
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new MessageException("Message not found with id "+ messageId);
	}

	@Override
	public void deleteMessage(Integer messageId, User reqUser) throws UserException,MessageException {
		Optional<Message> opt = messageRepository.findById(messageId);
		if (opt.isPresent()) {
			Message msg = opt.get();
			if (msg.getUser().getId().equals(reqUser.getId())) {
				messageRepository.delete(msg);
			}
		}
		
		throw new UserException("You cant delete another user's message"+reqUser.getFullName());
	}

}
