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
    private final JwtService jwtService;

    public static final Logger logger = LoggerFactory.getLogger(AccountController.class);
    private final ModelMapper modelMapper;


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

    @PostMapping("/follow")
    public ResponseEntity follow(@RequestBody AccountDto.FollowRequest followRequest){
        accountService.follow(followRequest);
        return ResponseEntity.ok().build();
    }


    //-------------------------------------- 로그인 -----------------------------------------------------


    @GetMapping("/relogin")
    public ResponseEntity relogin(@RequestHeader(value = "Authorization") String token)
    {
        //System.out.println(token);
        Object o =  accountService.decryptToken(token);
        logger.info(o.toString());
        return ResponseEntity.ok().build();
    }



    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AccountDto.LoginRequest loginRequest) {
        //이메일 보내줌 email 전송
        accountService.login(loginRequest);
        return ResponseEntity.ok().build();
    }
//    // TODO: 2021-01-21 수정하기
    @PostMapping("/loginvalidation")
    public ResponseEntity loginValidation(@RequestBody AccountDto.LoginValidationRequest loginValidationRequest) {
        //email, authNum 받음 DTO 따로 또 만들기 loginValidationRequest
        //email로 findByEmail 한 account 이 account의 authNum이랑 authNum 비교
        //맞으면 로그인 성공했으니 토큰이랑 유저 정보 보내주기, 틀리면 적절한 문구 여기서 + 최초로그인 성공한 사람(accountRole==TEMP) 였던 사람은 cert로 변경

        //--------------Testing------------------------------


            Map<String, Object> resultMap ;
            resultMap =  accountService.loginValidation(loginValidationRequest);
            HttpStatus status = null;
            if(resultMap.containsKey("id")) {
                status = HttpStatus.ACCEPTED;
            } else {
                status = HttpStatus.BAD_REQUEST;
            }
            //--------------------------------------------------------------------------------

        return new ResponseEntity(resultMap, status);
    }

}
