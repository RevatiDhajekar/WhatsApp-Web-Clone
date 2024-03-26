package com.app.whatsAppWeb.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalException {

	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetail> UserExceptionHandler(UserException e , WebRequest request){
		ErrorDetail err = new ErrorDetail(e.getMessage(),request.getDescription(false),LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(err , HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetail> OtherExceptionHandler(Exception e , WebRequest request){
		ErrorDetail err = new ErrorDetail(e.getMessage(),request.getDescription(false),LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(err , HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MessageException.class)
	public ResponseEntity<ErrorDetail> MessageExceptionHandler(MessageException e , WebRequest request){
		ErrorDetail err = new ErrorDetail(e.getMessage(),request.getDescription(false),LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(err , HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(ChatException.class)
	public ResponseEntity<ErrorDetail> ChatExceptionHandler(ChatException e , WebRequest request){
		ErrorDetail err = new ErrorDetail(e.getMessage(),request.getDescription(false),LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(err , HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorDetail> MetghodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e , WebRequest request){
		String error = e.getBindingResult().getFieldError().getDefaultMessage();
		
		ErrorDetail err = new ErrorDetail("Validation Error",error,LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(err , HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ErrorDetail> MessageExceptionHandler(NoHandlerFoundException e , WebRequest request){
		ErrorDetail err = new ErrorDetail("Endpoint not found",e.getMessage(),LocalDateTime.now());
		
		return new ResponseEntity<ErrorDetail>(err , HttpStatus.BAD_REQUEST);
	}
}
