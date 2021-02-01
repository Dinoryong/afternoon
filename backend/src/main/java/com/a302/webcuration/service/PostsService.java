package com.a302.webcuration.service;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.domain.Post.Posts;
import com.a302.webcuration.domain.Post.PostsDto;
import com.a302.webcuration.domain.Post.PostsRepository;
import com.a302.webcuration.domain.Tag.Tag;
import com.a302.webcuration.domain.Tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostsService {
    private final PostsRepository postsRepository;
    private final AccountService accountService;
    private final LoginService2 loginService2;
    private final AccountRepository accountRepository;
    private final TagRepository tagRepository;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;
    public static final Logger logger = LoggerFactory.getLogger(PostsService.class);

    @Transactional
    public PostsDto.CreateAccountRequest createPosts(PostsDto.CreateAccountRequest createAccountRequest, String token){
        Long myId = jwtService.getAccountId(token);
        Account postWriter=accountRepository.findAccountByAccountId(myId);
        List<Tag> tags = createAccountRequest.getPostsTags().stream().map(tag ->
                tagRepository.findByTagTitle(tag.getTagTitle())
        ).collect(Collectors.toList());
        //System.out.println("tags = " + tags.get(0));
        Posts posts=modelMapper.map(createAccountRequest,Posts.class);
        posts.writePost(postWriter);
        //System.out.println("postss = " + posts);
        // TODO: 2021-01-28  post_tag도 반영시켜야 함

        for (Tag tag : tags){
            tag.addPostsTags(posts);
            //.addPostsTags(tag);
        }
        Posts writePost=null;
        if(posts!=null)
            writePost=postsRepository.save(posts);

        //게시글이 잘 만들어졌다면
        if(writePost!= null)
            return createAccountRequest;
        else
            return null;
    }
}
