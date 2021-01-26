package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.common.BaseStatus;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.service.AccountService;
import com.a302.webcuration.service.JwtService;
import com.a302.webcuration.service.LoginService2;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
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
    private final LoginService2 loginService;
    private final JwtService jwtService;

    public static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    private final ModelMapper modelMapper;


    //get을 제외한 모든 요청은 다 토큰 필요하도록 매핑

    //---------------------------------- 회원 생성 ------------------------------------------------

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

    //-------------------------------수정--------------------------
    @PutMapping("/{id}")
    public ResponseEntity updateAccount(@PathVariable Long id , @RequestBody @Valid AccountDto.UpdateRequest request)
    {
        accountService.updateAccount(id,request);

        //TODO 예외처리
        //일단 오류 체킹 안하고 accepted받기
        return new ResponseEntity(HttpStatus.ACCEPTED);

    }


    //---------------------조회--------------------
    @GetMapping("/{id}")
    public ResponseEntity retrieveAccountById(@PathVariable Long id)
    {
        return new ResponseEntity(new BaseMessage(BaseStatus.OK,accountService.findAccountById(id)),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity retrieveAccountAll()
    {
        return new ResponseEntity(new BaseMessage(BaseStatus.OK,accountService.findAll()),HttpStatus.OK);
    }


    //--------------------------------------팔로잉------------------------------------------------------

    @PutMapping("/my-following")
    public ResponseEntity follow(@RequestBody AccountDto.FollowRequest request, @RequestHeader(value = "Authorization") String token){

        Long myId = jwtService.getAccountId(token);
        Long yourId = request.getYourId();
        logger.info("my: "+myId+" your: "+yourId);
        BaseMessage bm = accountService.follow(myId, yourId);
        HttpStatus httpStatus = HttpStatus.OK;
        if(bm.getStatus().equals(BaseStatus.BAD_REQUEST))
        {
            httpStatus=HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity(bm.getInfo(),httpStatus);
    }


}
