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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


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
    public ResponseEntity login(@RequestBody @Valid AccountDto.LoginRequest loginRequest, Errors errors) {

        if(errors.hasErrors())
        {
            return new ResponseEntity(new BaseMessage(BaseStatus.BAD_REQUEST,errors), HttpStatus.BAD_REQUEST);
        }

        loginService.loginValidator(loginRequest,errors);

        if(errors.hasErrors())
        {
            return new ResponseEntity(new BaseMessage(BaseStatus.BAD_REQUEST,errors), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(loginService.login(loginRequest),HttpStatus.OK);
    }

    @PostMapping("/auto-login")
    public ResponseEntity autoLogin(@RequestBody @Valid AccountDto.LoginRequest loginRequest,@RequestHeader(value = "Authorization") String token, Errors errors) {
        if(errors.hasErrors())
        {
            return new ResponseEntity(new BaseMessage(BaseStatus.BAD_REQUEST,errors), HttpStatus.BAD_REQUEST);
        }

        loginService.loginValidator(loginRequest,errors);

        if(errors.hasErrors())
        {
            return new ResponseEntity(new BaseMessage(BaseStatus.BAD_REQUEST,errors), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(loginService.autoLogin(loginRequest,token), HttpStatus.OK);
    }
}
