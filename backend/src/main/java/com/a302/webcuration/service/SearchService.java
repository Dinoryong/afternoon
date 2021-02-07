package com.a302.webcuration.service;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.domain.Post.Posts;
import com.a302.webcuration.domain.Post.PostsDto;
import com.a302.webcuration.domain.Tag.Tag;
import com.a302.webcuration.domain.Tag.TagDto;
import com.a302.webcuration.domain.Tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchService {
    public static final Logger logger = LoggerFactory.getLogger(SearchService.class);
    private final AccountRepository accountRepository;
    private final AccountService accountService;
    private final TagRepository tagRepository;
    private final ModelMapper modelMapper;
    public BaseMessage search(String name){
        //태그 검색 시도
        Tag tag =tagRepository.findByTagTitle(name);
        if(tag!=null){
            return findPostsByTagTitle(tag);
        }else {//사용자 검색
            return findAccountByNickname(name);
        }
    }

    private BaseMessage findPostsByTagTitle(Tag tag) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            logger.info("tag : "+tag);

            List<PostsDto.PostsWithOnePhoto> postsWithOnePhotos=new ArrayList<>();
            int postsCnt=tag.getPosts().size();
            for (int idx=0;idx<postsCnt;idx++){
                Posts posts=tag.getPosts().get(idx);
                PostsDto.PostsWithOnePhoto writtenPost= PostsDto.PostsWithOnePhoto.builder()
                        .postsId(posts.getPostsId())
                        .postsWriter(posts.getPostWriter().getAccountName())
                        .postsTitle(posts.getPostsTitle())
                        .postsPhoto(posts.getPostsPhotos().get(0))
                        .build();
                postsWithOnePhotos.add(writtenPost);
            }
            TagDto.TagRelatedPosts tagRelatedPosts= TagDto.TagRelatedPosts.builder()
                    .writtenPosts(postsWithOnePhotos)
                    .writtenPostsCnt(postsCnt)
                    .build();
            return new BaseMessage(HttpStatus.OK,tagRelatedPosts);
        }catch (Exception e){
            resultMap.put("errors",e);
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }

    private BaseMessage findAccountByNickname(String name) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Account account = accountRepository.findAccountByAccountNickname(name);
            if(account!=null){  //해당 유저 존재
                //팔로잉, 팔로워
                return accountService.profileMapping(account);
            }else{              //태그도 유저도 존재하지 않음
                resultMap.put("message","태그도 유저도 존재하지 않습니다.");
                return new BaseMessage(HttpStatus.NO_CONTENT,resultMap);
            }
        }catch (Exception e){
            resultMap.put("errors",e);
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }

}
