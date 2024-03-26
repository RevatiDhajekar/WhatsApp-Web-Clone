package com.app.whatsAppWeb.request;

import java.util.List;

import lombok.Data;

@Data
public class GroupChatRequest {

	private List<Integer> userIds;
	private String chatName;
	private String chatImage;
}
