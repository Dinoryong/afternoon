package com.a302.webcuration.domain.Post;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Pin.Pin;
import com.a302.webcuration.domain.Tag.Tag;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    //@ElementCollection - List<String> 사용 가능 참조 링크 - (https://antoniogoncalves.org/2009/11/01/mapping-and-querying-a-list-of-primitive-types-with-jpa-2-0/)
    @ElementCollection
    private List<String> postsPhotos;
    @CreationTimestamp
    private LocalDate postsWriteTime;
    @UpdateTimestamp
    private LocalDate postsUpdateTime;
    @Builder.Default
    @OneToMany
    private List<Pin> pins=new ArrayList<>();
    private String postsLocation;
    //좋아요한 유저
    @Builder.Default
    @ManyToMany(mappedBy = "likePosts")
    private List<Account> likeAccounts=new ArrayList<>();
    @ManyToOne
    private Account postWriter;
    //@JsonIgnore
    @Builder.Default
    @ManyToMany(mappedBy = "posts")
    private List<Tag> postsTags =new ArrayList<>();

}
