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
    @ManyToOne
    private Account commentWriter;
    private String commentLink;
    private String commentContent;

    @ManyToOne
    private Pin pin;

    @ManyToOne
    private Posts commentPosts;
}
