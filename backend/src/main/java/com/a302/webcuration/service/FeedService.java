package com.a302.webcuration.service;

import com.a302.webcuration.common.BaseMessage;
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

@Service
@Transactional
@RequiredArgsConstructor
public class FeedService {
    private final PostsRepository postsRepository;
    private final JwtService jwtService;
    public static final Logger logger = LoggerFactory.getLogger(FeedService.class);

    public BaseMessage findByMyTagAndFollowing(String token){
        Long myId = jwtService.getAccountId(token);
        Map<String, Object> resultMap = new HashMap<>();
        try {
            List<Object[]> postsByTag=postsRepository.selectByMyTag(myId);
            logger.info("postsByTag.size : "+postsByTag.size());
            List<Object[]> postsByFollowing =postsRepository.selectByMyFollowing(myId);
            logger.info("postsByFollowing.size : "+postsByFollowing.size());
            List<PostsDto.Feed> feeds=new ArrayList<>();
            addFeed(postsByTag, feeds);
            addFeed(postsByFollowing, feeds);
            logger.info("feeds.size = "+feeds.size());
            //정렬
            Collections.sort(feeds, new Comparator<PostsDto.Feed>() {
                @Override
                public int compare(PostsDto.Feed o1, PostsDto.Feed o2) {
                    return (int)(o2.getPostsId()- o1.getPostsId());
                }
            });
            return new BaseMessage(HttpStatus.OK,feeds);
        }catch (Exception e){
            resultMap.put("errors",e);
            return new BaseMessage(HttpStatus.BAD_REQUEST,resultMap);
        }
    }

    private void addFeed(List<Object[]> postsByFollowing, List<PostsDto.Feed> feeds) {
        for (Object[] postTmp:postsByFollowing) {
            logger.info("postsTitle " + postTmp[0] + " " + postTmp[1]+ " " + postTmp[2]);
            feeds.add(new PostsDto.Feed((Long)postTmp[0],(String)postTmp[1],(String)postTmp[2],(String)postTmp[3]));
        }
    }
}
