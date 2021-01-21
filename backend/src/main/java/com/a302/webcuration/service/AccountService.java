package com.a302.webcuration.service;

import com.a302.webcuration.controller.AccountController;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.domain.Account.Role;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;
    private final JavaMailSender mailSender;
    private final JwtService jwtService;
    public static final Logger logger = LoggerFactory.getLogger(AccountService.class);
    @Transactional
    public List<AccountDto.CreateAccountResponse> findAll()
    {
        List<AccountDto.CreateAccountResponse> accounts = new ArrayList<>();
        for (Account account : accountRepository.findAll()) {
            accounts.add(modelMapper.map(account,AccountDto.CreateAccountResponse.class));
        }
        return accounts;
    }

    @Transactional
    public AccountDto.AccountProfile findAccountById(Long id)
    {
        Account account = accountRepository.findAccountByAccountId(id);
        System.out.println("account = " + account.getAccountName());
        AccountDto.AccountProfile profile = modelMapper.map(account,AccountDto.AccountProfile.class);

        List<AccountDto.FollowingDto> following = new ArrayList<>();
        List<AccountDto.FollowerDto> follower = new ArrayList<>();
        int followingCnt = account.getFollowing().size();
        int followerCnt = account.getFollower().size();
        Iterator<Account> iterFollower = account.getFollower().iterator();
        while(iterFollower.hasNext())
        {
            follower.add(modelMapper.map(iterFollower.next(),AccountDto.FollowerDto.class));
        }
        Iterator<Account> iterFollowing = account.getFollowing().iterator();
        while(iterFollowing.hasNext())
        {
            following.add(modelMapper.map(iterFollowing.next(),AccountDto.FollowingDto.class));
        }

        profile.setProfileFollower(follower);
        profile.setProfileFollowing(following);
        profile.setFollowerCnt(followerCnt);
        profile.setFollowingCnt(followingCnt);

        return profile;
    }

    @Transactional
    public void follow(AccountDto.FollowRequest followRequest){

        Account aAccount= accountRepository.findById(followRequest.getAId())
                .orElseThrow(()->new
                        IllegalArgumentException("a 유저가 없습니다"));

        Account bAccount= accountRepository.findById(followRequest.getBId())
                .orElseThrow(()->new
                        IllegalArgumentException("b 유저가 없습니다"));

        bAccount.followAccount(aAccount);
    }

    @Transactional
    public void login(AccountDto.LoginRequest loginRequest)
    {
        Account account = accountRepository.findByAccountEmail(loginRequest.getAccountEmail());
        if(account==null){
            //이메일에 해당하는 사용자 없음

        }else{
            //이메일에 해당하는 사용자 있음
            String authCode = createEmailCode();
            account.changeAuthNum(authCode);
            sendMail(account.getAccountEmail(),authCode);
        }
    }

    // TODO: 2021-01-21 수정 필요 
    public Map loginValidation(AccountDto.LoginValidationRequest loginValidationRequest) {
        Account account=accountRepository.findByAccountEmail(loginValidationRequest.getAccountEmail());
        Map<String, Object> resultMap = new HashMap<>();
        if(account.getAccountAuthNum().equals(loginValidationRequest.getAccountAuthNum())){
            //로그인 성공
            //최초로그인 성공한 사람인지
            if(account.getAccountRole().equals(Role.TEMPORARY)){
                //인증된 사용자로 변환
                account.changeRole(Role.CERTIFICATED);
                //DB에 저장이 되나 확인
            }
            resultMap=loginInfo(account);
        }else{
            resultMap.put("message", "로그인 실패");
        }
        return resultMap;
    }

    // TODO: 2021-01-21 ResponseLoginDTO 만들기 
    public Map loginInfo(Account account){
        Map<String, Object> resultMap = new HashMap<>();
        String token = jwtService.create(account);
        logger.trace("로그인 토큰정보 : {}", token);
        resultMap.put("auth-token", token);
        resultMap.put("id", account.getAccountName());
        resultMap.put("email", account.getAccountEmail());
        return resultMap;
    }


    public void sendMail(String email,String authCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[PINSET] 로그인(이메일) 인증 코드 발송");
        message.setText("이메일 인증코드는 "+authCode+" 입니다.");
        System.out.println("message "+ message);
        mailSender.send(message);
    }

    private String createEmailCode() { //이메일 인증코드 생성
        String[] str = {"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
                "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9"};
        String newCode = new String();

        for (int x = 0; x < 8; x++) {
            int random = (int) (Math.random() * str.length);
            newCode += str[random];
        }
        return newCode;
    }



}
