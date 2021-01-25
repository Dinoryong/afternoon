package com.a302.webcuration.service;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.domain.Post.Posts;
import com.a302.webcuration.domain.Post.PostsDto;
import com.a302.webcuration.domain.Post.PostsRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostsService {
    private final PostsRepository postsRepository;
    private final AccountService accountService;
    private final AccountRepository accountRepository;

    //토큰값으로 작성자 알아내고 게시글 작성
    public Posts createPosts(PostsDto.CreateAccountRequest createAccountRequest,String token){
        Long myId = accountService.getAccountId(token);
        Account postWriter=accountRepository.findAccountByAccountId(myId);
        Posts posts =createAccountRequest.toEntity(postWriter);
        postsRepository.save(posts);
        return posts;
    }
}
