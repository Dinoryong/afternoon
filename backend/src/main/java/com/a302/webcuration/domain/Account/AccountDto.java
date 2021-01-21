package com.a302.webcuration.domain.Account;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.modelmapper.ModelMapper;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

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

    @Getter @Setter @RequiredArgsConstructor
    //팔로워
    public static class FollowerDto{
        private Long id;
        private String name;
        private String nickname;
    }

    @Getter @Setter @RequiredArgsConstructor
    //팔로워
    public static class FollowingDto{
        private Long id;
        private String name;
        private String nickname;
    }

    @Getter @Setter @RequiredArgsConstructor
    public static class AccountProfile{

        private String name;

        private String nickname;

        private String email;

        private LocalDate accountCreateDate;

        private String accountDesc;

        private List<AccountDto.FollowingDto> profileFollowing;

        private List<AccountDto.FollowerDto> profileFollower;

        private int followingCnt;

        private int followerCnt;

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

    @Getter @Setter @RequiredArgsConstructor
    //팔로워
    public static class LoginRequest{
        private String accountEmail;
    }

}
