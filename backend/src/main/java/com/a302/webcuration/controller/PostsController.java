package com.a302.webcuration.controller;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.domain.Post.PostsDto;
import com.a302.webcuration.service.PostsService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/posts")
@RequiredArgsConstructor
public class PostsController {
    private final PostsService postsService;
    public static final Logger logger = LoggerFactory.getLogger(PostsController.class);


    @PostMapping
    public ResponseEntity createPosts(@RequestBody @Valid PostsDto.CreatePostsRequest createAccountRequest, @RequestHeader(value = "Authorization") String token){
       BaseMessage bm=postsService.createPosts(createAccountRequest,token);
        return new ResponseEntity(bm,bm.getHttpStatus());

    }

    @GetMapping("/{postsid}")
    public ResponseEntity retrievePosts(@PathVariable Long postsid){
        BaseMessage bm=postsService.retrievePosts(postsid);
        return new ResponseEntity(bm,bm.getHttpStatus());
    }

//    @DeleteMapping("{postsid}")
//    public ResponseEntity deletePosts(@PathVariable Long postsid){
//        postsService.deletePosts(postsid);
//    }
}
