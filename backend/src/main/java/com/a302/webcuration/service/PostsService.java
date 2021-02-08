package com.a302.webcuration.service;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.domain.Pin.Pin;
import com.a302.webcuration.domain.Pin.PinDto;
import com.a302.webcuration.domain.Post.Posts;
import com.a302.webcuration.domain.Post.PostsDto;
import com.a302.webcuration.domain.Post.PostsRepository;
import com.a302.webcuration.domain.Tag.Tag;
import com.a302.webcuration.domain.Tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostsService {
    private final PostsRepository postsRepository;
    private final AccountRepository accountRepository;
    private final TagRepository tagRepository;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;
    public static final Logger logger = LoggerFactory.getLogger(PostsService.class);

    public BaseMessage createPosts(PostsDto.CreatePostsRequest createPostsRequest, String token){
        Long myId = jwtService.getAccountId(token);
        Map<String, Object> resultMap = new HashMap<>();

        try {
            //여기서 아마 글 작성자가 존재하지 않으면 오류 발생할 것
            Account postWriter = accountRepository.findAccountByAccountId(myId);
            logger.info("postsssd : " + createPostsRequest.toString());
            //posts에 저장
            Posts posts = createPostsRequest.toEntity();
            posts.writePost(postWriter);
            logger.info("postsss : " + posts.toString());

            //tag 지정
            List<Tag> tags = createPostsRequest.getPostsTags().stream().map(tag ->
                    tagRepository.findTagByTagId(tag.getTagId())
            ).collect(Collectors.toList());
            for (Tag tag : tags) {
                tag.addPostsTags(posts);
            }
            //pin 지정
            List<Pin> pins = new ArrayList<>();
            for (PinDto.Pin pinDto : createPostsRequest.getPostsPins()) {
                pins.add(pinDto.toEntity());
            }
            for (Pin pin : pins) {
                pin.saveWithCascadePosts(posts);
            }
            Posts createdPosts=postsRepository.save(posts);
            PostsDto.PostsResponse postsResponse = modelMapper.map(createdPosts,PostsDto.PostsResponse.class);
            return new BaseMessage(HttpStatus.CREATED,postsResponse);
        }
        catch (Exception e)
        {
            resultMap.put("errors",e);
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }

    public BaseMessage retrievePosts(Long postsid){
        Map<String, Object> resultMap = new HashMap<>();
        Posts posts=postsRepository.findPostsByPostsId(postsid);
        if(posts==null){
            resultMap.put("message","존재하지 않는 게시물입니다.");
            return new BaseMessage( HttpStatus.BAD_REQUEST,resultMap);
        }
        logger.info("posts = " + posts);
        PostsDto.PostsResponse postsResponse = modelMapper.map(posts,PostsDto.PostsResponse.class);
        logger.info("postsResponse = " + postsResponse);
        return new BaseMessage(HttpStatus.OK,postsResponse);

    }


    public void deletePosts(Long postsid) {

    }
}
