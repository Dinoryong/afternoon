package com.a302.webcuration.domain.Tag;

import com.a302.webcuration.domain.Post.PostsDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class TagDto {
    @Data @NoArgsConstructor @AllArgsConstructor
    @Builder
    public static class Tag{
        private Long tagId;
    }

    @Data
    @Builder
    public static class TagRelatedPosts{
        private List<PostsDto.PostsWithOnePhoto> writtenPosts;
        private int writtenPostsCnt;
        private boolean tagState;
    }
}
