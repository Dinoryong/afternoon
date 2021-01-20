package com.a302.webcuration.domain.Account;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class AccountDto {

    @Getter
    @Setter
    @Builder
    //계정 팔로잉
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
    @Getter @Setter
    //계정 생성 결과
    public static class CreateAccountResponse
    {
        private Long accountId;

        private String accountName;
        private String accountNickname;
        private String accountEmail;

        private LocalDate accountCreateDate;
        private LocalDate accountUpdateDate;

        private Role accountRole;
        private String accountDesc;

    }

}
