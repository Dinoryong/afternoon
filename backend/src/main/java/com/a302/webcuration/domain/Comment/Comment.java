package com.a302.webcuration.domain.Comment;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Pin.Pin;
import com.a302.webcuration.domain.Post.Posts;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @NoArgsConstructor @AllArgsConstructor @Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long commentId;

    //accountId
    //private Long commentWriterId;
    //작성자 사진, 작성자 닉네임
    private String accountNickname="";
    private String accountPhoto ="";

    @Builder.Default
    @Column(columnDefinition = "TEXT")
    private String commentLink ="";
    @Builder.Default
    private String commentContent="";

    public void addCommentWriter(String accountNickname, String accountPhoto)
    {
        this.accountNickname=accountNickname;
        this.accountPhoto=accountPhoto;
    }

    public void saveWithCascadePosts(Posts post){
        post.getComments().add(this);
        commentPosts=post;
    }

    public void saveWithCascadePin(Pin pin){
        pin.getComments().add(this);
        commentPin=pin;
    }

    @ManyToOne
    private Pin commentPin;

    @ManyToOne
    private Posts commentPosts;
}
