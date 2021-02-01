package com.a302.webcuration.domain.Post;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Pin.PinDto;
import com.a302.webcuration.domain.Tag.Tag;
import com.a302.webcuration.domain.Tag.TagDto;
import lombok.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotNull;
import java.util.List;

public class PostsDto {

    //글 작성
    @Data  @Builder
    public static class CreatePostsRequest {
        private String postsTitle;
        private String postsContents;
        private List<String> postsPhotos;
        private List<TagDto.Tag> postsTags;
        private List<PinDto.Pin> postsPins; //
    }

    @Getter @Setter @RequiredArgsConstructor @ToString
    public static class PostsResponse{
        @NotNull
        private String postsTitle;
        @NotNull
        private String postsContents;
        private List<String> postsPhotos;
        //private String postsLocation;
        //tag
    }

}
