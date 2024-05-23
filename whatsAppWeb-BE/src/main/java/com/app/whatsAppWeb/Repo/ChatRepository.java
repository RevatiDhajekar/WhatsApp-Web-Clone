package com.app.whatsAppWeb.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.whatsAppWeb.entity.Chat;
import com.app.whatsAppWeb.entity.User;

public interface ChatRepository extends JpaRepository<Chat, Integer>{
	@Query("select ch from Chat ch WHERE :user MEMBER OF ch.users")
	public List<Chat> findChatsByUser(@Param("user") User user);
	
	@Query("select ch from Chat ch where ch.isGroup = false AND :user MEMBER OF ch.users AND :reqUser MEMBER OF ch.users")
	public Chat findSingleChatByUsers(@Param("user") User user , @Param("reqUser") User reqUser);
}
