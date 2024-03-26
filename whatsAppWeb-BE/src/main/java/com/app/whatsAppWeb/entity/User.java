package com.app.whatsAppWeb.entity;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "wa_user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer id;
	
	@Column(name = "full_name")
	private String fullName;
	
	private String email;
	
	private String password;
	
	@Column(name = "profile_image")
	private String profileImage;
	
	@ManyToMany(mappedBy = "admins")
	private Set<Chat> groups = new HashSet<>();
	
	@ManyToMany(mappedBy = "users")
	private Set<Chat> chats = new HashSet<>();
	
	@OneToMany(mappedBy = "user")
	private List<Message> messages = new ArrayList<>();;
}
