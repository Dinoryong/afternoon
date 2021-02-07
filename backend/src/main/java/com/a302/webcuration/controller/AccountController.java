package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.common.BaseStatus;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.domain.Tag.TagRepository;
import com.a302.webcuration.service.AccountService;
import com.a302.webcuration.service.JwtService;
import com.a302.webcuration.service.LoginService2;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

//http://localhost:8080/swagger-ui.html

@RestController
@RequestMapping(value = "/api/accounts")
@RequiredArgsConstructor
@Api
public class AccountController {
    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final LoginService2 loginService;
    private final JwtService jwtService;
    private final TagRepository tagRepository;
    public static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    private final ModelMapper modelMapper;


    //get을 제외한 모든 요청은 다 토큰 필요하도록 매핑

    //---------------------------------- 회원 생성 ------------------------------------------------

    @PostMapping
    public ResponseEntity createAccount(@RequestBody @Valid AccountDto.CreateAccountRequest createAccountRequest)
    {
        Account account = createAccountRequest.toEntity();
        accountRepository.save(account);
        return new ResponseEntity(new BaseMessage(HttpStatus.CREATED,modelMapper.map(account,AccountDto.AccountProfile.class)),HttpStatus.CREATED);
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

    //---------------------내 정보 조회--------------------
    @GetMapping
    public ResponseEntity retrieveAccountById(@RequestHeader(value = "Authorization") String token)
    {
        BaseMessage bm = accountService.findAccountById(token);
        return new ResponseEntity(bm,bm.getHttpStatus());
    }
    //--------------------------------------팔로잉------------------------------------------------------

    @PutMapping("/my-following")
    public ResponseEntity follow(@RequestBody AccountDto.FollowRequest request, @RequestHeader(value = "Authorization") String token){

        Long myId = jwtService.getAccountId(token);
        Long yourId = request.getYourId();
        logger.info("my: "+myId+" your: "+yourId);
        BaseMessage bm = accountService.follow(myId, yourId);
        return new ResponseEntity(bm,bm.getHttpStatus());
    }

    @PutMapping("/mytag")
    public ResponseEntity selectTag(@RequestBody @Valid AccountDto.AccountTagRequest accountTagRequest, @RequestHeader(value = "Authorization") String token) {
        if(!accountTagRequest.getTags().isEmpty()){
            logger.info("지정한 관심태그 존재");
            accountService.selectTag(accountTagRequest,token);
        }else {
            logger.info("지정한 관심태그 없음");
        }
            return ResponseEntity.ok().build();
    }

}
