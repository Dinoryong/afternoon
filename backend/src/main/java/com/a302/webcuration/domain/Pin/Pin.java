package com.a302.webcuration.domain.Pin;

import com.a302.webcuration.domain.Comment.Comment;
import com.a302.webcuration.domain.Post.Posts;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @NoArgsConstructor @AllArgsConstructor @Builder
public class Pin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long pinId;
    @NotNull
    private String pinName;
    private Double pinLocY;
    private Double pinLocX;
    // 작성자
    private String pinLink;
    // 네이버 API가 설정한 URL
    private String pinApiLink;
    // 네이버 API 통한 분류 소분류
    private String pinApiClass;
    //해당하는 사진의 순서를 위한 핀넘버링
    private Integer pinNum;
    @ManyToOne
    private Posts posts;

    @Builder.Default
    @OneToMany(mappedBy = "commentPin")
    private List<Comment> comments=new ArrayList<>();

    public void saveWithCascadePosts(Posts post){
        post.getPostsPins().add(this);
        posts=post;
    }

//    @Override
//    public String toString() {
//        return "Pin{" +
//                "pinId=" + pinId +
//                ", pinLocY=" + pinLocY +
//                ", pinLocX=" + pinLocX +
//                ", pinLink='" + pinLink + '\'' +
//                ", pinContents='" + pinContents + '\'' +
//                ", pinNum=" + pinNum +
//                '}';
//    }
}
