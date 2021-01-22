package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.common.BaseStatus;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.service.AccountService;
import com.a302.webcuration.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final JwtService jwtService;

    public static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    private final ModelMapper modelMapper;


    //get을 제외한 모든 요청은 다 토큰 필요하도록 매핑

    //---------------------------------- 회원 ------------------------------------------------

    @PostMapping("/signup")
    public ResponseEntity createAccount(@RequestBody @Valid AccountDto.CreateAccountRequest createAccountRequest, Errors errors)
    {
        if(errors.hasErrors())
        {
            return new ResponseEntity(new BaseMessage(BaseStatus.BAD_REQUEST,errors), HttpStatus.BAD_REQUEST);
        }

        Account account = createAccountRequest.toEntity();
        accountRepository.save(account);

        return new ResponseEntity(new BaseMessage(BaseStatus.CREATED,createAccountRequest),HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity retrieveAccountById(@PathVariable Long id, Errors errors)
    {
        if(errors.hasErrors())
        {
            return new ResponseEntity(new BaseMessage(BaseStatus.BAD_REQUEST,errors), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(new BaseMessage(BaseStatus.OK,accountService.findAccountById(id)),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity retrieveAccountAll()
    {
        return new ResponseEntity(new BaseMessage(BaseStatus.OK,accountService.findAll()),HttpStatus.OK);
    }

    //--------------------------------------팔로잉------------------------------------------------------

    @PostMapping("/follow/{yourId}")
    public ResponseEntity follow(@PathVariable Long yourId, @RequestHeader(value = "Authorization") String token){

        Long myId = accountService.getAccountId(token);
        boolean can = accountService.followValidator(myId,yourId);
        if(!can)
        {
            return ResponseEntity.badRequest().build();
        }
        accountService.follow(myId, yourId);

        return ResponseEntity.ok().build();
    }
    //-------------------------------------- 로그인 -----------------------------------------------------

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AccountDto.LoginRequest loginRequest,Errors errors) {

        if(errors.hasErrors())
        {
            return new ResponseEntity(new BaseMessage(BaseStatus.BAD_REQUEST,errors), HttpStatus.BAD_REQUEST);
        }

        accountService.ExistEmailAddress(loginRequest,errors);

        if(errors.hasErrors())
        {
            return new ResponseEntity(new BaseMessage(BaseStatus.BAD_REQUEST,errors), HttpStatus.BAD_REQUEST);
        }

        accountService.login(loginRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login/auth")
    public ResponseEntity loginValidation(@RequestBody AccountDto.LoginAuthKeyRequest loginAuthKeyRequest) {
        Map<String, Object> resultMap ;
        resultMap =  accountService.loginWithAuthKey(loginAuthKeyRequest);
        HttpStatus status = null;
        if(resultMap.containsKey("AccountId")) {
            status = HttpStatus.ACCEPTED;
        } else {
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity(resultMap, status);
    }

}
