package com.a302.webcuration.domain.Post;

import com.a302.webcuration.domain.Pin.Pin;
import com.a302.webcuration.domain.Tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    @Builder.Default
    @OneToMany
    private List<Pin> pins=new ArrayList<>();
    private String postsLocation;
    private int postsLike;
    @Builder.Default
    @ManyToMany
    private List<Tag> tags=new ArrayList<>();

}
