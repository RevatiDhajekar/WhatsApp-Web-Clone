package com.app.whatsAppWeb.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
	private Integer id;
	
	@Column(name = "full_name")
	private String fullName;
	
	private String email;
	
	private String password;
	
	@Column(name = "profile_image")
	private String profileImage;
	
//	@OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
//	private List<Notification> notifications = new ArrayList<>();
	
}
