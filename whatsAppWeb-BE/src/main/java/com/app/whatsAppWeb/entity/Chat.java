package com.app.whatsAppWeb.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "chat")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
public class Chat {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer id;
	
	@Column(name = "chat_name")
	private String chatName;
	
	@Column(name = "chat_image")
	private String chatImage;
	
	@Column(name = "is_group")
	private Boolean isGroup;
	
	@ManyToMany
	@JoinTable(name = "chat_admin", 
			joinColumns = @JoinColumn(name = "chat_id"), 
			inverseJoinColumns = @JoinColumn(name = "admin_id"))
	private Set<User> admins = new HashSet<>();
	
	
	@ManyToOne
	@JoinColumn(name = "created_by") 
	private User createdBy;
	
	@ManyToMany
	@JoinTable(name = "chat_user", 
			joinColumns = @JoinColumn(name = "chat_id"), 
			inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> users = new HashSet<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "chat")
	private List<Message> messages = new ArrayList<>();
	
}
