package com.a302.webcuration.domain.Post;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
import com.a302.webcuration.domain.Comment.CommentDto;
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

        @NotNull(message = "사진 없이 글을 등록할 수 없습니다.")
        private List<String> postsPhotos;

        @NotNull(message = "태그 없이 글을 등록할 수 없습니다.")
        private List<TagDto.Tag> postsTags;

        private List<PinDto.Pin> postsPins;

        public Posts toEntity()
        {
            return Posts.builder()
                    .postsTitle(this.postsTitle)
                    .postsContents(this.postsContents)
                    .postsPhotos(this.postsPhotos)
                    .build();
        }
    }


    @Data @RequiredArgsConstructor
    public static class PostsResponse{
        @NotNull
        private String postsTitle;
        @NotNull
        private String postsContents;
        private List<String> postsPhotos;
        private List<TagDto.Tag> tags;
        private List<PinDto.Pin> pins;
        private List<CommentDto.CreateCommentResponse> comments;
    }

    @AllArgsConstructor @Data
    public static class Feed {
        private Long postsId;

        private String postsTitle;
        private String postsPhoto;
        //작성자
        private String postsWriter;
    }

    @AllArgsConstructor @Data @Builder
    public static class PostsWithOnePhoto {
        private Long postsId;
        private String postsWriter;
        private String postsTitle;
        private String postsPhoto;

    }

    @AllArgsConstructor @Data
    public static class LikePosts{
        private Long postsId;
        private String postsTitle;
        private String postsPhoto;
    }


}
