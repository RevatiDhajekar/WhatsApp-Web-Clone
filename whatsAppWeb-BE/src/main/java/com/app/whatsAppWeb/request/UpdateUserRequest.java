package com.app.whatsAppWeb.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateUserRequest {

	private String fullName;
	private String profileImage;
	
}
