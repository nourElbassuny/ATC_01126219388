package com.areeb.Areeb.event.dto;

import com.areeb.Areeb.event.entity.Role;
import com.areeb.Areeb.event.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String firstname;
    private String lastname;
    private Role role;
    private String email;
    private String password;
    private User ourUsers;
}
