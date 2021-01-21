package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.common.BaseStatus;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.service.JwtService;
import com.a302.webcuration.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.internal.Errors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;
    private final AccountRepository accountRepository;
    @Autowired
    private JwtService jwtService;

    public static final Logger logger = LoggerFactory.getLogger(AccountController.class);
    private final ModelMapper modelMapper;

    @PostMapping
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
    public ResponseEntity createAccount(@PathVariable Long id, Errors errors)
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

    @PostMapping("/follow")
    public ResponseEntity follow(@RequestBody AccountDto.FollowRequest followRequest){
        accountService.follow(followRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Account account) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try {
            Account loginAccount = accountService.login(account.getAccountEmail());
            System.out.println(loginAccount);
            if(loginAccount != null) {
//				jwt.io에서 확인
//				로그인 성공했다면 토큰을 생성한다.
                String token = jwtService.create(loginAccount);
                logger.trace("로그인 토큰정보 : {}", token);

                resultMap.put("auth-token", token);
                resultMap.put("id", loginAccount.getAccountName());
                resultMap.put("name", loginAccount.getAccountEmail());
                status = HttpStatus.ACCEPTED;
            } else {
                resultMap.put("message", "로그인 실패");
                status = HttpStatus.BAD_REQUEST;
            }
        } catch (Exception e) {
            logger.error("로그인 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

}
