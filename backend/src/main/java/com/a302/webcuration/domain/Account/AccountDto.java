package com.a302.webcuration.domain.Account;

import com.a302.webcuration.domain.Post.PostsDto;
import com.a302.webcuration.domain.Tag.TagDto;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class AccountDto {


    @Getter
    //계정 팔로잉
    @Setter
    @RequiredArgsConstructor
    public static class FollowRequest {
        @NotNull
        private Long yourId;
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

    // TODO: 2021-02-06  내 모든 posts, 내가 좋아요한 게시물, 내 관심태그, 좋아요한 게시물 수, 게시물 수
    @Getter @Setter @RequiredArgsConstructor
    public static class AccountProfile{

        private Long accountId;

        private String accountName;

        private String accountNickname;

        private String accountEmail;

        private LocalDate accountCreateDate;

        private String accountBio;

        private String accountPhoto;

        private List<AccountDto.FollowingDto> following;

        private List<AccountDto.FollowerDto> follower;

        private int accountFollowingCnt;

        private int accountFollowerCnt;

        private List<PostsDto.PostsWithOnePhoto> writtenPosts;

        private int writtenPostsCnt;

        private List<PostsDto.PostsWithOnePhoto> likePosts;

        private List<TagDto.Tag> tags;

    }

    @Getter @Setter @RequiredArgsConstructor
    public static class UpdateRequest
    {
        private String accountBio;
        private String accountNickname;
        private String accountPhoto;
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
        @Email(message = "알맞은 이메일 형식으로 입력해주세요.")
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
        private String accountBio;

    }
    @Getter @Setter @RequiredArgsConstructor
    public static class LoginRequest{

        //TODO
        //@NotNull
        private String act;

        @Email(message = "알맞은 이메일 형식이 아닙니다.")
        private String accountEmail;
        private String accountAuthKey;

        private Long accountId;

    }

    @Getter @Setter @RequiredArgsConstructor
    public static class AccountInfoInHeader{
        private Long accountId;
        private String accountEmail;
    }
    //태그 설정
    @Getter @Setter @RequiredArgsConstructor
    public static class AccountTagRequest{
        //private List<String> tagName=new ArrayList<>();
        private List<TagDto.Tag> tags=new ArrayList<>();
    }

}
