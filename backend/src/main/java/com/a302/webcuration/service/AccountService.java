package com.a302.webcuration.service;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Account.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;
    private JavaMailSender mailSender;

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

    public void sendMail(String userpwd, String email) {
        // TODO Auto-generated method stub
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("HappyHouse 비밀번호찾기 안내 메일입니다.");
        message.setText("비밀번호는 "+userpwd+"입니다.");
        System.out.println("message "+ message);
        mailSender.send(message);
    }
    //수정 필요
    public Account login(String accountEmail) {
        return accountRepository.findByAccountEmail(accountEmail);
    }

}
