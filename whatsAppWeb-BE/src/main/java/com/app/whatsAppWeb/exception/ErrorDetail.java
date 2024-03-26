package com.app.whatsAppWeb.exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorDetail {

	private String error;
	private String message;
	private LocalDateTime timeStamp;
}
