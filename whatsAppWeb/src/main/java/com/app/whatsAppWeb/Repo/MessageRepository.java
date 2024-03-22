package com.app.whatsAppWeb.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.whatsAppWeb.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Integer>{

	@Query("SELECT m FROM Message m join m.chat ch WHERE ch.id = :chatId")
	public List<Message> findByChatId(@Param("chatId") Integer chatId);
	
}
