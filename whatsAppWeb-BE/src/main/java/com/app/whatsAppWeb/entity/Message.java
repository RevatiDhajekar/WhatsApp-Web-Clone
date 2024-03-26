package com.app.whatsAppWeb.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "message")
@EqualsAndHashCode
@Data
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer id;
	
	private String content;
	
	private LocalDateTime timeStamp;
	
	@ManyToOne
	@JoinColumn(name = "user_id") 
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "chat_id") 
	private Chat chat;
	
}
