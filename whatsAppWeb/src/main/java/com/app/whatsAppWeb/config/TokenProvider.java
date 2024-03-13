package com.app.whatsAppWeb.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenProvider {

	SecretKey key = JwtConstant.SECRET_KEY;

	public String generateToken(Authentication authentication) {

		String jwt = Jwts.builder().setIssuer("Revati").setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + 8640000)).claim("email", authentication.getName())
				.signWith(key).compact();

		return jwt;
	}

	public String getEmailFromToken(String jwt) {
		jwt = jwt.substring(7); // seperate token from Bearer token
		Claims claim = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		String email = String.valueOf(claim.get("email"));
		return email;
	}

}
