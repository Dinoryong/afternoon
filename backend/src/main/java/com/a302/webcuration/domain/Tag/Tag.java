package com.a302.webcuration.domain.Tag;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Post.Posts;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter @NoArgsConstructor @AllArgsConstructor @Builder
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tagId;
    //태그 정보
    @Column(unique = true)
    private String tagTitle;

    //Hibernate MultipleBagFetchException 때문에 List-> Set으로 https://perfectacle.github.io/2019/05/01/hibernate-multiple-bag-fetch-exception/
    @ManyToMany(mappedBy = "tags")
    @Builder.Default
    private List<Account> accounts=new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "POSTS_TAG",
            joinColumns = @JoinColumn(name = "TAG_ID"),
            inverseJoinColumns = @JoinColumn(name = "POSTS_ID")
    )
    @Builder.Default
    private List<Posts> posts=new ArrayList<>();

    public void addPostsTags(Posts posts){
        this.posts.add(posts);
        posts.getPostsTags().add(this);
    }

    @Override
    public String toString() {
        return "Tag{" +
                "tagId=" + tagId +
                ", tagTitle='" + tagTitle + '\'' +
                ", posts=" + posts +
                '}';
    }
}
