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

        loginService.loginValidator(loginRequest,errors);

        if(errors.hasErrors())
        {
            return new ResponseEntity(new BaseMessage(BaseStatus.BAD_REQUEST,errors), HttpStatus.BAD_REQUEST);
        }
        BaseMessage bs = loginService.login(loginRequest);
        //TODO 오류 발견
        HttpHeaders httpHeaders = new HttpHeaders();
        //수정 해야됌-------------------------------------
        httpHeaders.add("test","temp");
        if(bs.getHeaders()!=null)
        {
         httpHeaders.add("Authorization",bs.getHeaders().toString());
        }
        //----------------------------------------------------------------------
        return new ResponseEntity(bs.getInfo(),httpHeaders,HttpStatus.OK);
    }

    @PostMapping("/auto-login")
    public ResponseEntity autoLogin(@RequestBody @Valid AccountDto.LoginRequest loginRequest,@RequestHeader(value = "Authorization") String token, Errors errors) {

        loginService.loginValidator(loginRequest,errors);

        if(errors.hasErrors())
        {
            return new ResponseEntity(new BaseMessage(BaseStatus.BAD_REQUEST,errors), HttpStatus.BAD_REQUEST);
        }

        BaseMessage bm = loginService.autoLogin(loginRequest,token);
        HttpStatus httpStatus = HttpStatus.OK;
        if(bm.getStatus().equals(BaseStatus.BAD_REQUEST))
        {
            httpStatus=HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity(bm.getInfo(), httpStatus);
    }
}