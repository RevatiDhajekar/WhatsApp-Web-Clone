package com.app.whatsAppWeb.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.whatsAppWeb.Repo.ChatRepository;
import com.app.whatsAppWeb.entity.Chat;
import com.app.whatsAppWeb.entity.User;
import com.app.whatsAppWeb.exception.ChatException;
import com.app.whatsAppWeb.exception.UserException;
import com.app.whatsAppWeb.request.GroupChatRequest;
import com.app.whatsAppWeb.service.ChatService;
import com.app.whatsAppWeb.service.UserService;

@Service
public class ChatServiceImpl implements ChatService{
	
	@Autowired
	private ChatRepository chatRepository;
	
	@Autowired
	private UserService userService;

	@Override
	public Chat createChat(User reqUser , Integer userId) throws UserException {		
		User userTochat = userService.findUserById(userId);
		Chat chat = chatRepository.findSingleChatByUsers(userTochat, reqUser);
		if(chat != null) {
			return chat;
		}
		Chat newChat = new Chat();
		newChat.setCreatedBy(reqUser);
		newChat.getUsers().add(userTochat);
		newChat.getUsers().add(reqUser);
		newChat.setIsGroup(false);
		newChat.setChatName(userTochat.getFullName());
		newChat.setChatImage(userTochat.getProfileImage());
		chatRepository.save(newChat);
		return newChat;
	}

	@Override
	public Chat findChatById(Integer chatId) throws ChatException {
		Optional<Chat> chat = chatRepository.findById(chatId);
		if(chat.isPresent()) {
			return chat.get();
		}
		throw new ChatException("chat not found with id "+ chatId);
	}

	@Override
	public List<Chat> findAllChatsByUserId(Integer userId) throws UserException {
		User user = userService.findUserById(userId);
		List<Chat> chatList = chatRepository.findChatsByUser(user);
		return chatList;
	}

	@Override
	public Chat createGroup(GroupChatRequest request, User reqUser) throws UserException {
		Chat group = new Chat();
		group.setIsGroup(true);
		group.setChatImage(request.getChatImage());
		group.setChatName(request.getChatName());
		group.setCreatedBy(reqUser);
		group.getAdmins().add(reqUser);
		for(Integer id : request.getUserIds()) {
			User user = userService.findUserById(id);
			group.getUsers().add(user);
		}
		group.getUsers().add(reqUser);
		chatRepository.save(group);
		return group;
	}

	@Override
	public Chat addUserToGroup(Integer userId, Integer chatId , User reqUser) throws UserException, ChatException {
		Optional<Chat> opt = chatRepository.findById(chatId);
		User newMember = userService.findUserById(userId);
		if(opt.isPresent()) {
		      Chat grp = opt.get();
		      if(grp.getAdmins().contains(reqUser)) {
		    	  grp.getUsers().add(newMember);
		    	  return chatRepository.save(grp);
		      }else {
		    	  throw new UserException("You are not Admin.");
		      }   
		}
		throw new ChatException("chat not found with id "+ chatId);	
	}

	@Override
	public Chat renameGroup(String grpName, Integer chatId, User reqUser) throws UserException, ChatException {
		Optional<Chat> opt = chatRepository.findById(chatId);
		if(opt.isPresent()) {
			Chat grp = opt.get();
			 if(grp.getUsers().contains(reqUser)) {
				 grp.setChatName(grpName);
				 return chatRepository.save(grp);
			 }
			 throw new UserException("You are not member of this group.");
		}
		throw new ChatException("chat not found with id "+ chatId);
	}

	@Override
	public Chat removeFromGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException {
		Optional<Chat> opt = chatRepository.findById(chatId);
		User userToRemove = userService.findUserById(userId);
		if (opt.isPresent()) {
			Chat grp = opt.get();
			if (grp.getAdmins().contains(reqUser)) {
				grp.getUsers().remove(userToRemove);
				return chatRepository.save(grp);
			} else if (grp.getUsers().contains(reqUser)) {
				if (userToRemove.getId().equals(reqUser.getId())) {
					grp.getUsers().remove(userToRemove);
					return chatRepository.save(grp);
				}
			}
				throw new UserException("You can't remove another user.");
		}
		throw new ChatException("chat not found with id " + chatId);
	}

	@Override
	public void deleteChat(Integer chatId, Integer userId) throws UserException, ChatException {
		Optional<Chat> opt = chatRepository.findById(chatId);
		if (opt.isPresent()) {
			Chat grp = opt.get();
			chatRepository.deleteById(chatId);
		}
	}

	
}
