package com.a302.webcuration.domain.Account;

import com.a302.webcuration.domain.Sample.Sample;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class AccountDto {

    @Getter
    @Setter
    @Builder
    public static class FollowRequest {
        @NotNull
        private Long aId;
        @NotNull
        private Long bId;
    }

    @Getter @Setter @Builder
    //계정 생성 요청
    public static class CreateAccountRequest
    {
        @NotNull
        private String accountName;

        @NotNull
        private String accountNickname;

        @NotNull
        @Email
        private String accountEmail;

        public Account toEntity()
        {
            return Account.builder()
                    .accountName(this.accountName)
                    .accountNickname(this.accountNickname)
                    .accountEmail(this.accountEmail)
                    .build();
        }
    }

    @Getter @Setter @Builder
    public static class LoginAccountRequest {
        @NotNull
        @Email
        private String accountEmail;

        public Account toEntity()
        {
            return Account.builder()
                    .accountEmail(this.accountEmail)
                    .build();
        }
    }
}
