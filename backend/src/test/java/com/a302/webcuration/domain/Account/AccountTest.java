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
        String accountNickname = "dntjr";
        String accountEmail = "dntjr11@naver.com";

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
        accountEmail = "jason967@naver.com";

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
        accountEmail = "wodnrrr@naver.com";

        Account account3 = Account.builder()
                .accountName(accountName)
                .accountNickname(accountNickname)
                .accountEmail(accountEmail)
                .build();

        accountRepository.save(account3);
    }

    @Test
    public void 유저_삭제() {
        accountRepository.deleteAll();
    }
}