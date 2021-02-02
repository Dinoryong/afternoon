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
    private Long commentWriterId;

    @Builder.Default
    private String commentLink ="";
    @Builder.Default
    private String commentContent="";

    public void addCommentWriterId(long id)
    {
        this.commentWriterId=id;
    }

    public void saveWithCascadePosts(Posts post){
        System.out.println("!!!!!!!");

        System.out.println(commentPosts.getComments().get(0).commentId);
        //commentPosts.getComments().add(this);
        System.out.println("@@@@@@@");
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
