package com.a302.webcuration.domain.Post;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Tag.Tag;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
        private List<Tag> postsTags;

        public Posts toEntity(Account postWriter){
            return Posts.builder()
                    .postsTitle(postsTitle)
                    .postsContents(postsContents)
                    .postsPhotos(postsPhotos)
                    .postsLocation(postsLocation)
                    .postsTags(postsTags)
                    .postWriter(postWriter)
                    .build();
        }
    }

}
