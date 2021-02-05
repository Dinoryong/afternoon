package com.a302.webcuration.service;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Account.AccountRepository;
import com.a302.webcuration.domain.Post.Posts;
import com.a302.webcuration.domain.Post.PostsDto;
import com.a302.webcuration.domain.Post.PostsRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedService {
    private final ModelMapper modelMapper;
    private final PostsRepository postsRepository;
    private final JwtService jwtService;
    public static final Logger logger = LoggerFactory.getLogger(FeedService.class);

    public BaseMessage findByMyTagAndFollowing(String token){
        Long myId = jwtService.getAccountId(token);
        Map<String, Object> resultMap = new HashMap<>();
        try {
            List<Posts> postsByTag=postsRepository.selectByMyTag(myId);
            logger.info("postsByTag.size : "+postsByTag.size());
            List<Posts> postsByFollowing =postsRepository.selectByMyFollowing(myId);
            logger.info("postsByFollowing.size : "+postsByFollowing.size());
            //두개의 list를 하나의 set으로 중복제거하면서 합치고
            Set<Posts> set=new HashSet<>();
            set.addAll(postsByTag);
            set.addAll(postsByFollowing);
            logger.info("set.size : "+set.size());
            //다시 리스트로 바꿈
            List<Posts> posts=new ArrayList<>(set);
            //정렬
            Collections.sort(posts, new Comparator<Posts>() {
                @Override
                public int compare(Posts o1, Posts o2) {
                    return (int)(o2.getPostsId()- o1.getPostsId());
                }
            });
            //PostsResponseDTO 형식으로 바꿈
            List<PostsDto.PostsResponse> postDtos=posts.stream().map(p->modelMapper.map(p,PostsDto.PostsResponse.class)).collect(Collectors.toList());
            return new BaseMessage(HttpStatus.OK,postDtos);
        }catch (Exception e){
            resultMap.put("errors",e);
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }
}
