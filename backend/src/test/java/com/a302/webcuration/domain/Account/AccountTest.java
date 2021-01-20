package com.a302.webcuration.domain.Account;

import com.a302.webcuration.common.BaseDomainTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class AccountTest extends BaseDomainTest {
    @Autowired
    AccountRepository accountRepository;

    @Test
    public void 유저_생성()
    {
        //Given
        //우석
        String accountName = "우석";
        String accountNickname = "dntjrrr";
        String accountEmail = "dntjr11";

        Account account = Account.builder()
                .accountName(accountName)
                .accountNickname(accountNickname)
                .accountEmail(accountEmail)
                .build();

        accountRepository.save(account);
        //재웅
        //Given
        accountName = "재웅";
        accountNickname = "wodnddd";
        accountEmail = "wownd11";

        Account account2 = Account.builder()
                .accountName(accountName)
                .accountNickname(accountNickname)
                .accountEmail(accountEmail)
                .build();

        accountRepository.save(account2);
        //재욱
        //Given
        accountName = "재욱";
        accountNickname = "wodnrrr";
        accountEmail = "wodnrrr";

        Account account3 = Account.builder()
                .accountName(accountName)
                .accountNickname(accountNickname)
                .accountEmail(accountEmail)
                .build();

        accountRepository.save(account3);
//        account2.followAccount(account);
//        account3.followAccount(account);
//        account3.followAccount(account2);

//        accountRepository.save(account);
//        accountRepository.save(account2);
//        accountRepository.save(account3);

//        for (Account a : account.getFollower()) {
//            System.out.println("a.getAccountName() = " + a.getAccountName());
//        }
//
//        int size=account.getFollower().size();
//        System.out.println("우석을 follow하는 사람 수 getFollower size = " + size);
//        size=account.getFollowing().size();
//        System.out.println("우석이 follwoing하는 사람 수 getFollowing size = " + size);
//        size=account2.getFollower().size();
//        System.out.println("재웅이 follow하는 사람 수 getFollower size = " + size);
        
    }

}