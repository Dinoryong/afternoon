package com.a302.webcuration.service;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.domain.Account.Role;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LoginService2 {

    @Value("${token.signiturekey}")
    private String signature ;

    public static final Logger logger = LoggerFactory.getLogger(AccountService.class);

    private final ModelMapper modelMapper;
    private final AccountRepository accountRepository;
    private final AccountService accountService;

    private final JavaMailSender mailSender;
    private final JwtService jwtService;
    private final EmailService emailService;

    //존재하는 이메일 여부 판정
    private Boolean IsExistAccountEmail(AccountDto.LoginRequest loginRequest)
    {
        Account account = accountRepository.findByAccountEmail(loginRequest.getAccountEmail());
        if(account==null)
            return false;
        return true;
    }

    @Transactional
    public BaseMessage login(AccountDto.LoginRequest loginRequest)
    {
        Map<String, Object> resultMap = new HashMap<>();
        if(!IsExistAccountEmail(loginRequest))
        {
            resultMap.put("errors","존재하지 않는 이메일입니다.");
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
        String act = loginRequest.getAct();
        switch (act)
        {
            case "login-request":
                logger.info(loginRequest.getAccountEmail()+"로 이메일 성공적으로 보냄");
                return loginRequest(loginRequest);
            //break;
            case "check-authKey-off":
                logger.info("인증키 일치여부가 확인되었습니다.");
                return checkAuthKeyOff(loginRequest);
            case "check-authKey-on":
                logger.info("토큰이 발행되었습니다.");
                return checkAuthKeyOn(loginRequest);
        }
        resultMap.put("errors","존재하지 않는 명령어입니다.");
        return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
    }

    @Transactional
    public BaseMessage loginRequest(AccountDto.LoginRequest request)
    {
        Map<String, Object> resultMap = new HashMap<>();
        try {

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization","default");

        Account account = accountRepository.findByAccountEmail(request.getAccountEmail());
        String authCode = emailService.createEmailCode();

        //db에 저장
        account.changeAuthKey(authCode);
        emailService.sendMail(account.getAccountEmail(),authCode);

        resultMap.put("message","성공적으로 메일이 전송되었습니다.");
        return new BaseMessage(HttpStatus.OK,httpHeaders,resultMap);
        }catch (Exception e)
        {
            logger.error(e.getMessage());
            resultMap.put("error", "존재하지 않는 계정정보입니다.");
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }

    @Transactional
    public BaseMessage checkAuthKeyOff(AccountDto.LoginRequest request) {

        Map<String, Object> resultMap = new HashMap<>();
        try {
        Account account=accountRepository.findByAccountEmail(request.getAccountEmail());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization","default");

        if(account.getAccountAuthKey().equals(request.getAccountAuthKey())){
            logger.info("인증키 일치!");
            if(account.getAccountRole().equals(Role.TEMPORARY)){
                resultMap.put("first-login","true");
                //temp-> cert
                logger.info("처음으로 로그인된 계정입니다. 관심태그를 입력 받아야 합니다.");
                account.changeRole(Role.CERTIFICATED);
            }
            resultMap.put("message","인증키가 일치합니다.");
            return new BaseMessage(HttpStatus.OK,httpHeaders,resultMap);
        }else{
            resultMap.put("error", "인증키가 일치하지 않습니다.");
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
        }catch (Exception e)
        {
            logger.error(e.getMessage());
            resultMap.put("error", "존재하지 않는 계정정보입니다.");
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }

    @Transactional
    public BaseMessage checkAuthKeyOn(AccountDto.LoginRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
        Account account=accountRepository.findByAccountEmail(request.getAccountEmail());
            HttpHeaders httpHeaders = new HttpHeaders();

        if(account.getAccountAuthKey().equals(request.getAccountAuthKey())){
            logger.info("인증키 일치!");
            resultMap.put("message","인증키가 일치합니다.");

            String email = account.getAccountEmail();
            Long id = account.getAccountId();
            String nickname= account.getAccountNickname();
            resultMap = loginInfo(id,email,nickname);

            String token = "Bearer "+jwtService.create(id,email);
            httpHeaders.add("Authorization",token);
            return new BaseMessage(HttpStatus.OK,httpHeaders,resultMap);

        }else{
            resultMap.put("error", "인증키가 일치하지 않습니다.");
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
        }catch (Exception e)
        {
            logger.error(e.getMessage());
            resultMap.put("error", "존재하지 않는 계정정보입니다.");
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }

    @Transactional
    public BaseMessage autoLogin(AccountDto.LoginRequest request,String token)
    {
        Map<String, Object> resultMap = new HashMap<>();
        if(!IsExistAccountEmail(request))
        {
            resultMap.put("errors","존재하지 않는 이메일입니다.");
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
        String email = jwtService.getAccountEmail(token);
        Long id = jwtService.getAccountId(token);
        if(request.getAccountId()==id && request.getAccountEmail().equals(email))
        {
            resultMap.put("message","인증키가 일치합니다.");
            Account account=accountRepository.findByAccountEmail(request.getAccountEmail());
            String nickname= account.getAccountNickname();
            resultMap = loginInfo(id,email,nickname);
            return new BaseMessage(HttpStatus.OK,resultMap);
        }
        else
        {
            resultMap.put("error", "토큰에 저장된 내용과 계정의 정보가 일치하지 않습니다.");
            logger.error("request.getAccountId() "+request.getAccountId()+", id "+id);
            logger.error("request.getAccountEmail() "+request.getAccountEmail()+", email "+email);
            logger.error("request.getAccountId().getClass().getName() : "+request.getAccountId().getClass().getName());
            logger.error("id.getClass().getName() : "+id.getClass().getName());
            logger.error("request.getAccountEmail().getClass().getName() : "+request.getAccountEmail().getClass().getName());
            logger.error("email.getClass().getName() : "+email.getClass().getName());
            logger.error("id check "+(request.getAccountId()==id));
            logger.error("email check "+(request.getAccountEmail()==email));
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }

    private Map loginInfo(Long id, String email,String nickname){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("accountId", id);
        resultMap.put("accountEmail", email);
        resultMap.put("accountNickname", nickname);
        return resultMap;
    }

}