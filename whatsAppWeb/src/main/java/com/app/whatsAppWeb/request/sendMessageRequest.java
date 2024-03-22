package com.app.whatsAppWeb.request;

import lombok.Data;

@Data
public class sendMessageRequest {

	private Integer userId;
	private Integer chatId;
	private String content;
}
