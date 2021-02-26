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

    @Getter @Setter @RequiredArgsConstructor
    public static class MyAccountProfile {
        private Long accountId;
        private String accountName;
        private String accountNickname;
        private String accountEmail;
        private LocalDate accountCreateDate;
        private String accountBio;

        private String accountPhoto;
        //팔로잉, 팔로워
        private List<AccountDto.FollowingDto> following;
        private List<AccountDto.FollowerDto> follower;
        private int accountFollowingCnt;
        private int accountFollowerCnt;
        //내가 쓴 게시물
        private List<PostsDto.PostsWithOnePhoto> writtenPosts;
        private int writtenPostsCnt;
        //내가 좋아요한 게시물
        private List<PostsDto.PostsWithOnePhoto> likesPosts;
        private int likesPostsCnt;
        //내 관심 태그
        private List<TagDto.Tag> tags;

    }
    @Data
    public static class AccountProfile {

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

        private Boolean followState;

    }

    @Getter @Setter @RequiredArgsConstructor
    public static class UpdateRequest
    {
        private String accountName;
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
        private List<TagDto.Tag> tags=new ArrayList<>();
    }

    @Data @NoArgsConstructor
    public static class LikeRequest {
        @NotNull
        private Long postId;
    }
    //작성자 사진 / 작성자닉네임  / 좋아요 상태
    @Data
    public static class PostsWriter{
        private String accountPhoto;
        private String accountNickname;

    }

    @Data @AllArgsConstructor
    public static class Contributor{
        private String accountNickname;
        private String accountPhoto;
    }

}
