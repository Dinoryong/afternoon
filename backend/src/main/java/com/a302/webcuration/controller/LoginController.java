package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.common.BaseStatus;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.service.AccountService;
import com.a302.webcuration.service.JwtService;
import com.a302.webcuration.service.LoginService2;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

//http://localhost:8080/swagger-ui.html

@RestController
@RequestMapping(value = "/api")
@RequiredArgsConstructor
public class LoginController {

    private final AccountService accountService;
    private final LoginService2 loginService;
    private final AccountRepository accountRepository;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;

    public static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AccountDto.LoginRequest loginRequest) {
        BaseMessage bm = loginService.login(loginRequest);
        return new ResponseEntity(new BaseMessage(bm.getHttpStatus(),bm.getData()),bm.getHeaders(),bm.getHttpStatus());
    }

    @PostMapping("/auto-login")
    public ResponseEntity autoLogin(@RequestBody @Valid AccountDto.LoginRequest loginRequest,@RequestHeader(value = "Authorization") String token) {

        BaseMessage bm = loginService.autoLogin(loginRequest,token);
        return new ResponseEntity(bm,bm.getHttpStatus());
    }
}