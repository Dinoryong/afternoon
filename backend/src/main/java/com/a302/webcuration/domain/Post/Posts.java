package com.a302.webcuration.domain.Post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter @NoArgsConstructor @AllArgsConstructor  @Builder
public class Posts {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long postsId;
    private String postsTitle;
    private String postsContents;
    private String postsPhoto;
    @CreationTimestamp
    private LocalDate postsWriteTime;
    @UpdateTimestamp
    private LocalDate postsUpdateTime;
    //private List pins;
    private String postsLocation;
    private int postsLike;
    //private List tags;

}
