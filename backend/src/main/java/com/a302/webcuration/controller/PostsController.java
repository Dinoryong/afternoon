package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.common.BaseStatus;
import com.a302.webcuration.domain.Post.PostsDto;
import com.a302.webcuration.domain.Post.PostsRepository;
import com.a302.webcuration.service.PostsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/posts")
@RequiredArgsConstructor
public class PostsController {
    private final PostsService postsService;
    private final PostsRepository postsRepository;
    public static final Logger logger = LoggerFactory.getLogger(PostsController.class);

    private final ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity createPosts(@RequestBody @Valid PostsDto.CreatePostsRequest createAccountRequest, @RequestHeader(value = "Authorization") String token){
        // TODO: 2021-01-25  예외처리
        PostsDto.CreatePostsRequest posts=postsService.createPosts(createAccountRequest,token);
        if(posts!=null)
            return new ResponseEntity(new BaseMessage(BaseStatus.CREATED,posts),HttpStatus.CREATED);
        else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

    }
    // TODO: 2021-02-01 posts 조회기능
    @GetMapping("/{postsid}")
    public ResponseEntity retrievePosts(@PathVariable Long postsid){
        PostsDto.PostsResponse postsResponse=postsService.retrievePosts(postsid);
        return new ResponseEntity(new BaseMessage(BaseStatus.OK,postsResponse),HttpStatus.OK);
    }

}
