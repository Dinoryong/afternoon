package com.a302.webcuration.domain.Pin;

import com.a302.webcuration.domain.Comment.Comment;
import com.a302.webcuration.domain.Post.Posts;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @NoArgsConstructor @AllArgsConstructor @Builder
public class Pin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long pinId;
    private Double pinLocY;
    private Double pinLocX;
    // 작성자
    private String pinLink;
    // 네이버 API가 설정한 URL

    private String pinContents;
    //해당하는 사진의 순서를 위한 핀넘버링
    private Integer pinNum;
    @ManyToOne
    private Posts posts;

    @Builder.Default
    @OneToMany(mappedBy = "pin")
    private List<Comment> comments=new ArrayList<>();

    public void saveWithCascadePosts(Posts post){
        post.getPostsPins().add(this);
        posts=post;
    }
}
