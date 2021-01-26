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
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AccountService {

    @Value("${token.signiturekey}")
    private String signature ;
    public static final Logger logger = LoggerFactory.getLogger(AccountService.class);

    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;
    private final LoginService2 accountService;
    private final JavaMailSender mailSender;
    private final JwtService jwtService;


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
        logger.info("account = "+account.getAccountName());

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
    public void updateAccount(Long id,AccountDto.UpdateRequest request) {
        try {
            Account account = accountRepository.findAccountByAccountId(id);
            account.updateAccount(request);
        }catch (Exception e)
        {
            //TODO exception 구체화하기
            logger.error(e.getMessage());
        }
    }

    @Transactional
    public BaseMessage follow(Long myId, Long yourId){
        Map<String, Object> resultMap = new HashMap<>();
        if(myId==yourId)
        {
            resultMap.put("message","자기 자신을 팔로우 할 수 없습니다.");
            return new BaseMessage( BaseStatus.BAD_REQUEST,resultMap);
        }
        try {
            Account aAccount= accountRepository.findAccountByAccountId(myId);
            Account bAccount= accountRepository.findAccountByAccountId(yourId);
            aAccount.followAccount(bAccount);
            resultMap.put("message",myId+"가 "+yourId+" 를 팔로우하였습니다.");
            return new BaseMessage(BaseStatus.OK,resultMap);
        }catch (Exception e)
        {
            resultMap.put("message","객체가 존재하지 않습니다.");
            return new BaseMessage( BaseStatus.BAD_REQUEST,resultMap);
        }
    }

    @Transactional
    public void selectTag(AccountDto.AccountTagRequest accountTagRequest, String token){
        Long myId = accountService.getAccountId(token);
        Account account=accountRepository.findAccountByAccountId(myId);
        // TODO: 2021-01-26 account의 관심태그 설정
        account.tagging(accountTagRequest.getTags());
    }

}
