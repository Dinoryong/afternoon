package com.a302.webcuration.service;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountDto;
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
    private final JwtService jwtService;
    public BaseMessage search(String name,String token){
        Long myId;
        Account myAccount=null;
        if(token!=null) {
            myId = jwtService.getAccountId(token);
            myAccount = accountRepository.findAccountByAccountId(myId);
        }
        Map<String, Object> resultMap = new HashMap<>();
        try {
            //태그 검색 시도
            Tag tag =tagRepository.findByTagTitle(name);
            if(tag!=null){
                return findPostsByTagTitle(tag,myAccount);
            }else {//사용자 검색
                return findAccountByNickname(name,myAccount);
            }
        }
        catch (Exception e)
        {
            resultMap.put("errors",e);
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }

    private BaseMessage findPostsByTagTitle(Tag tag,Account myAccount) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            logger.info("tag : "+tag);

            List<PostsDto.PostsWithOnePhoto> postsWithOnePhotos=new ArrayList<>();
            int postsCnt=tag.getPosts().size();
            for (int idx=0;idx<postsCnt;idx++){
                Posts posts=tag.getPosts().get(idx);
                PostsDto.PostsWithOnePhoto writtenPost= PostsDto.PostsWithOnePhoto.builder()
                        .postsId(posts.getPostsId())
                        .postsWriter(posts.getPostWriter().getAccountNickname())
                        .postsTitle(posts.getPostsTitle())
                        .postsPhoto(posts.getPostsPhotos().get(0))
                        .build();
                postsWithOnePhotos.add(writtenPost);
            }
            //정렬
            Collections.sort(postsWithOnePhotos, new Comparator<PostsDto.PostsWithOnePhoto>() {
                @Override
                public int compare(PostsDto.PostsWithOnePhoto o1, PostsDto.PostsWithOnePhoto o2) {
                    return (int)(o2.getPostsId()- o1.getPostsId());
                }
            });

            //로그인하고 태그검색시 자신이 관심태그로 설정해놨는지 여부 체크
            boolean tagState = false;
            if(myAccount!=null) {
                logger.info("myAccount : " + myAccount);
                logger.info("tag : " + tag);
                for (Tag myTag : myAccount.getTags()) {
                    if (myTag == tag) {
                        logger.info("관심태그로 지정한 태그");
                        tagState = true;
                        break;
                    }
                }
            }

            TagDto.TagRelatedPosts tagRelatedPosts= TagDto.TagRelatedPosts.builder()
                    .writtenPosts(postsWithOnePhotos)
                    .writtenPostsCnt(postsCnt)
                    .tagState(tagState)
                    .build();
            return new BaseMessage(HttpStatus.OK,tagRelatedPosts);
        }catch (Exception e){
            resultMap.put("errors",e);
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }

    private BaseMessage findAccountByNickname(String name, Account myAccount) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Account account = accountRepository.findAccountByAccountNickname(name);
            if(account!=null){  //해당 유저 존재
                //팔로잉, 팔로워
                AccountDto.MyAccountProfile profile=accountService.profileMapping(account);
                //사용자 검색시 자신이 팔로잉했는지 체크
                boolean followState = false;
                if(myAccount!=null) {
                    Iterator<Account> iterFollower = account.getFollower().iterator();
                    while (iterFollower.hasNext()) {
                        if (iterFollower.next().getAccountId() == myAccount.getAccountId()) {
                            followState = true;
                            break;
                        }
                    }
                }
                AccountDto.AccountProfile accountProfile=modelMapper.map(profile,AccountDto.AccountProfile.class);
                accountProfile.setFollowState(followState);
                logger.info("accountProfile : "+accountProfile);
                return  new BaseMessage(HttpStatus.OK, accountProfile);
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
