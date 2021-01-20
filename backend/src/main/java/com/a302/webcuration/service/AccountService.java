package com.a302.webcuration.service;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Account.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Transactional
    public void follow(AccountDto.FollowRequest followRequest){
        Account aAccount= accountRepository.findById(followRequest.getAId())
                .orElseThrow(()->new
                        IllegalArgumentException("a 유저가 없습니다"));

        Account bAccount= accountRepository.findById(followRequest.getBId())
                .orElseThrow(()->new
                        IllegalArgumentException("b 유저가 없습니다"));

        bAccount.followAccount(aAccount);
        //accountRepository.save(accountB);
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
