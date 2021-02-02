package com.a302.webcuration.service;

import com.a302.webcuration.common.BaseMessage;
import com.a302.webcuration.common.BaseStatus;
import com.a302.webcuration.controller.AccountController;
import com.a302.webcuration.controller.CommentController;
import com.a302.webcuration.domain.Comment.Comment;
import com.a302.webcuration.domain.Comment.CommentDto;
import com.a302.webcuration.domain.Comment.CommentRepository;
import com.a302.webcuration.domain.Pin.Pin;
import com.a302.webcuration.domain.Pin.PinRepository;
import com.a302.webcuration.domain.Post.Posts;
import com.a302.webcuration.domain.Post.PostsRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final PostsRepository postsRepository;
    private final CommentRepository commentRepository;
    private final PinRepository pinRepository;

    public static final Logger logger = LoggerFactory.getLogger(CommentController.class);

    public Boolean createCommentValidation(CommentDto.CreateCommentRequest request)
    {
        if (!request.getCommentLink().isEmpty())
        {
            if(request.getPinId()==null || request.getPinNum()==0)
            {
                return false;
            }
        }
        return true;
    }

    @Transactional
    public BaseMessage createComment(long postsId, long accountId, CommentDto.CreateCommentRequest request)
    {
        //사용가능 여부 판별
        logger.info("사용가능 여부: "+createCommentValidation(request).toString());
        Map<String, Object> resultMap = new HashMap<>();
        logger.info("link: "+ request.getCommentLink());
        Comment comment = request.toEntity();
        comment.addCommentWriterId(accountId);
        logger.info(comment.getCommentWriterId().toString());
        //링크가 존재하는 경우
        if(request.getCommentLink()!=null)
        {
            Posts post = postsRepository.findPostsByPostsId(postsId);
            System.out.println("post.getPostsId() = " + post.getPostsId());
            Pin pin = pinRepository.findPinByPinId(request.getPinId());

            logger.info("999999999999999999999999999");
            pin.getComments().add(comment);
            logger.info("00000000000000000000000000");
            post.getComments().add(comment);
            System.out.println("post 의 댓글 개수 = " + post.getComments().size());
            logger.info("111111111111111111111111111111");
            comment.saveWithCascadePosts(post);
            logger.info("2222222222222222222222222222222");
            //comment.saveWithCascadePin(pin);
            logger.info("3333333333333333333333333333333");
            logger.info("pin의 댓글의 개수: "+pin.getComments().size());
            for (Comment pinComment : pin.getComments()) {
                System.out.println("pinComment.getCommentContent() = " + pinComment.getCommentContent());
            }
            //post.addComment();
            resultMap.put("hasLink","링크가 삽입되어있습니다.");
        }
        commentRepository.save(comment);
        logger.info("postId: "+postsId +" accountId: "+accountId);
        logger.info("request Info: "+request.getCommentContent());
        resultMap.put("message","값 잘 받아오는 지 테스트 중입니다.");
        return new BaseMessage(BaseStatus.OK,resultMap);
    }


}
