package com.a302.webcuration.domain.Post;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Tag.Tag;
import com.a302.webcuration.domain.Tag.TagDto;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotNull;
import java.util.List;

public class PostsDto {

    //글 작성
    @Getter @Setter @Builder
    public static class CreateAccountRequest{
        @NotNull
        private String postsTitle;
        @NotNull
        private String postsContents;
        private List<String> postsPhotos;
        private String postsLocation;
        private List<TagDto.Tag> postsTags;
    }

    // TODO: 2021-01-28  이제 안씀. PostsDto.CreateAccountRequest -> PostsDto.Post 로 바꾸면서 안에 postsTags 제네릭이 다른데 변환시켜야함
    @Data
    public static class Post{
        private String postsTitle;
        private String postsContents;
        private List<String> postsPhotos;
        private String postsLocation;
        private Account postWriter;     //
        private List<Tag> postsTags;    //
        //private List<TagDto.Tag> postsTags;
        //private AccountDto.Accounts postWriter;
    }
}
