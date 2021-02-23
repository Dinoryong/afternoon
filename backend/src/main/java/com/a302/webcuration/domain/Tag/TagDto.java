package com.a302.webcuration.domain.Tag;

import com.a302.webcuration.domain.Account.AccountDto;
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
        //이 태그의 게시물 수
        private int writtenPostsCnt;
        //이 태그를 관심태그로 지정한 유저의 수
        private Long interestedPeopleCnt;
        //이 태그 관련 제일 인기 많은 받은 게시물 top3
        private List<Long> mostPopularPosts;
        //이 태그에 top contributor top3
        private List<AccountDto.Contributor> mostContributor;
        private boolean tagState;
    }
}
