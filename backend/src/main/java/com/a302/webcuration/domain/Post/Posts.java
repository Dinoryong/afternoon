package com.a302.webcuration.domain.Post;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Comment.Comment;
import com.a302.webcuration.domain.Pin.Pin;
import com.a302.webcuration.domain.Tag.Tag;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
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
    @OneToMany(mappedBy = "posts", cascade = CascadeType.ALL)
    private List<Pin> postsPins=new ArrayList<>();
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

    @Builder.Default
    @OneToMany(mappedBy = "commentPosts")
    private List<Comment> comments=new ArrayList<>();

    public void writePost(Account account){
        this.postWriter=account;
        account.getMyPosts().add(this);
    }

}
