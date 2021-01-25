package com.a302.webcuration.service;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.common.BaseStatus;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.domain.Account.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;

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
    private final JavaMailSender mailSender;
    private final JwtService jwtService;
    private final EmailService emailService;

    //존재하는 이메일 여부 판정
    public void loginValidator(AccountDto.LoginRequest loginRequest, Errors errors)
    {
        Account account = accountRepository.findByAccountEmail(loginRequest.getAccountEmail());
        if(account==null)
        {
            errors.rejectValue("AccountEmail","doesn't exist","등록되지 않은 이메일입니다.");
        }
    }

    @Transactional
    //TODO 디폴트 만들기
    public BaseMessage login(AccountDto.LoginRequest loginRequest)
    {
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
        return null;
    }

    public BaseMessage autoLogin(AccountDto.LoginRequest request,String token)
    {
        String email = getAccountEmail(token);
        Long id = getAccountId(token);
        if(request.getId().equals(id)&&request.getAccountEmail().equals(email))
        {
            return new BaseMessage(BaseStatus.OK,accountRepository.findAccountByAccountId(id));
        }
        else
        {
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("match","false");
            return new BaseMessage(BaseStatus.BAD_REQUEST,resultMap);
        }
    }

    public BaseMessage loginRequest(AccountDto.LoginRequest request)
    {
        Account account = accountRepository.findByAccountEmail(request.getAccountEmail());
        String authCode = emailService.createEmailCode();
        //db에 저장
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("message","성공적으로 메일이 전송되었습니다.");
        account.changeAuthKey(authCode);
        emailService.sendMail(account.getAccountEmail(),authCode);
        return new BaseMessage(BaseStatus.OK,resultMap);
    }

    @Transactional
    public BaseMessage checkAuthKeyOff(AccountDto.LoginRequest request) {
        Account account=accountRepository.findByAccountEmail(request.getAccountEmail());
        Map<String, Object> resultMap = new HashMap<>();
        if(account.getAccountAuthKey().equals(request.getAccountAuthKey())){
            logger.info("인증키 일치!");
            if(account.getAccountRole().equals(Role.TEMPORARY)){
                resultMap.put("first-login","true");
                //temp-> cert
                logger.info("처음으로 로그인된 계정입니다. 관심태그를 입력 받아야 합니다.");
                account.changeRole(Role.CERTIFICATED);
            }
            resultMap.put("message","인증키가 일치합니다.");
            resultMap.put("match","true");
            return new BaseMessage(BaseStatus.OK,resultMap);
        }else{
            resultMap.put("message", "인증키가 일치하지 않습니다.");
            resultMap.put("match","false");
            return new BaseMessage(BaseStatus.BAD_REQUEST,resultMap);
        }
    }

    public Long getAccountId(String tokenKey)
    {
        String token=tokenKey.substring(7);

        Jws<Claims> claims = null;

        try {
            claims = Jwts.parser().setSigningKey(signature.getBytes()).parseClaimsJws(token);
            logger.info("AccountId :"+claims.getBody().get("accountId"));
        } catch (final Exception e) {
            logger.info("복호화 실패");
            throw new RuntimeException();
        }
        return  Long.parseLong(claims.getBody().get("accountId").toString());
    }
    public String getAccountEmail(String tokenKey)
    {
        String token=tokenKey.substring(7);

        Jws<Claims> claims = null;

        try {
            claims = Jwts.parser().setSigningKey(signature.getBytes()).parseClaimsJws(token);
            logger.info("AccountId :"+claims.getBody().get("accountId"));
        } catch (final Exception e) {
            logger.info("복호화 실패");
            throw new RuntimeException();
        }
        return  claims.getBody().get("accountEmail").toString();
    }


    @Transactional
    public BaseMessage checkAuthKeyOn(AccountDto.LoginRequest request) {
        Account account=accountRepository.findByAccountEmail(request.getAccountEmail());
        Map<String, Object> resultMap = new HashMap<>();
        if(account.getAccountAuthKey().equals(request.getAccountAuthKey())){
            logger.info("인증키 일치!");
            String email = account.getAccountEmail();
            Long id = account.getAccountId();
            resultMap.put("message","인증키가 일치합니다.");
            resultMap.put("match","true");
            return new BaseMessage(BaseStatus.OK,resultMap,loginInfo(id,email));
        }else{
            resultMap.put("message", "인증키가 일치하지 않습니다.");
            resultMap.put("match","false");
            return new BaseMessage(BaseStatus.BAD_REQUEST,resultMap);
        }
    }

    public Map loginInfo(Long id, String email){
        Map<String, Object> resultMap = new HashMap<>();
        String token = "Bearer "+jwtService.create(id,email);
        logger.trace("로그인 토큰정보 : {}", token);
        resultMap.put("Authorization", token);
        resultMap.put("AccountId", id);
        resultMap.put("AccountEmail", email);
        return resultMap;
    }




}
