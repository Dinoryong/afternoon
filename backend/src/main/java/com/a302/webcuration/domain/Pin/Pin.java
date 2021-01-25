package com.a302.webcuration.domain.Pin;

import com.a302.webcuration.domain.Comment.Comment;
import com.a302.webcuration.domain.Post.Posts;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @NoArgsConstructor @AllArgsConstructor @Builder
public class Pin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long pinId;
    private Double locY;
    private Double locX;
    private String link;
    private String contents;

    @Builder.Default
    @OneToMany(mappedBy = "pin")
    private List<Comment> comments=new ArrayList<>();
}
