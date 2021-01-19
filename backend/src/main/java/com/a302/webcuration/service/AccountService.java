package com.a302.webcuration.service;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Account.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

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
}
