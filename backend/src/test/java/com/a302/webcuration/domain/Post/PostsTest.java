package com.a302.webcuration.domain.Post;

import com.a302.webcuration.common.BaseDomainTest;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class PostsTest extends BaseDomainTest {
    @Autowired
    PostsRepository postsRepository;
    @Autowired
    AccountRepository accountRepository;
    @Test
    public void 게시글_생성()
    {
        //Given
        String postsTitle="내 작업공간 어때";
        String postsContents="이러이런거 있어";
        String postsLocation="수원시 팔달구";
        List<String> postsPhotos=new ArrayList<>();
        postsPhotos.add("https://lh3.googleusercontent.com/proxy/kr-1BRXpuhgwIVpc5pcfcVV-nEsUduJldGbOpvAUwxHeNK--u7fWsYXfb3PccxrDHvj-HyjDFEyVxUmjQ4oXKVMYGjoJS4wqfyS58JN-Vd6e");
        postsPhotos.add("https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg");
        //작성자
//        String accountName = "우석";
//        String accountNickname = "dntjr";
//        String accountEmail = "dntjr4772@naver.com";
//
//        Account postWriter = Account.builder()
//                .accountName(accountName)
//                .accountNickname(accountNickname)
//                .accountEmail(accountEmail)
//                .build();
        Account postWriter=accountRepository.findByAccountEmail("dntjr4772@naver.com");
        Posts posts=Posts.builder()
                .postsTitle(postsTitle)
                .postsContents(postsContents)
                .postsPhotos(postsPhotos)
                .postWriter(postWriter)
                .build();
        postsRepository.save(posts);
    }
    @Test
    public void 게시물_전부삭제(){
        postsRepository.deleteAll();
    }

}