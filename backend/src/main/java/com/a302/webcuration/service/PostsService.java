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
@RequiredArgsConstructor
public class PostsService {
    private final PostsRepository postsRepository;
    private final AccountRepository accountRepository;
    private final TagRepository tagRepository;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;
    public static final Logger logger = LoggerFactory.getLogger(PostsService.class);

    @Transactional
    public BaseMessage createPosts(PostsDto.CreatePostsRequest createAccountRequest, String token){
        Long myId = jwtService.getAccountId(token);
        Map<String, Object> resultMap = new HashMap<>();

        try {
            //여기서 아마 글 작성자가 존재하지 않으면 오류 발생할 것
            Account postWriter = accountRepository.findAccountByAccountId(myId);
            logger.info("postsssd : " + createAccountRequest.toString());
            //posts에 저장
            Posts posts = createAccountRequest.toEntity();
            posts.writePost(postWriter);
            logger.info("postsss : " + posts.toString());

            //tag 지정
            // TODO: 2021-02-01 게시물작성시 태그없을때 오류
            List<Tag> tags = createAccountRequest.getPostsTags().stream().map(tag ->
                    tagRepository.findTagByTagId(tag.getTagId())
            ).collect(Collectors.toList());
            for (Tag tag : tags) {
                tag.addPostsTags(posts);
            }
            //pin 지정
            List<Pin> pins = new ArrayList<>();
            for (PinDto.Pin pinDto : createAccountRequest.getPostsPins()) {
                System.out.println("pinn = " + pinDto);
                pins.add(pinDto.toEntity());

            }

            //똑같음
//        List<Pin> pins=createAccountRequest.getPostsPins().stream().map(pin ->
//                pin.toEntity()
//        ).collect(Collectors.toList());

            for (Pin pin : pins) {
                System.out.println("pinsss = " + pin);
                pin.saveWithCascadePosts(posts);
                System.out.println("pinddd = " + pin);
            }

            postsRepository.save(posts);
            return new BaseMessage(HttpStatus.CREATED,createAccountRequest);
        }
        catch (Exception e)
        {
            resultMap.put("errors",e);
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }

    @Transactional
    public PostsDto.PostsResponse retrievePosts(Long postsid){
        System.out.println("posts id : "+postsid);
        Posts posts=postsRepository.findPostsByPostsId(postsid);
        //System.out.println("postsss = " + posts.toString());
        PostsDto.PostsResponse postsResponse = modelMapper.map(posts,PostsDto.PostsResponse.class);

        System.out.println("postsResponse = " + postsResponse);
        return postsResponse;
    }
}
