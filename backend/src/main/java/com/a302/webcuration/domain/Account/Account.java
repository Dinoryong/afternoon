package com.a302.webcuration.domain.Account;

import com.a302.webcuration.domain.Post.Posts;
import com.a302.webcuration.domain.Tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter @NoArgsConstructor @AllArgsConstructor @Builder
public class Account {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long accountId;

    //기본 정보
    private String accountName;

    //unique key
    @Column(unique = true)
    private String accountNickname;
    @Column(unique = true)
    private String accountEmail;

    //시간 관련
    @CreationTimestamp
    private LocalDate accountCreateDate;
    @UpdateTimestamp
    private LocalDateTime accountUpdateDate;

    @Builder.Default
    private String accountDesc="";

    //인증
    @Builder.Default
    private String accountAuthKey ="";

    //임시 고객
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Role accountRole = Role.TEMPORARY;
    //팔로잉
    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Account> following=new HashSet<>();

    @Builder.Default
    @ManyToMany(mappedBy = "following")
    private Set<Account> follower=new HashSet<>();
    //관심 태그
    @Builder.Default
    @ManyToMany
    private List<Tag> tags=new ArrayList<>();
    //좋아요한 게시글
    @Builder.Default
    @ManyToMany
    private List<Posts> likePosts=new ArrayList<>();
    //내가 쓴 게시글
    @Builder.Default
    @OneToMany(mappedBy = "postWriter")
    private List<Posts> myPosts=new ArrayList<>();

    public void changeAuthKey(String accountAuthKey){
        this.accountAuthKey =accountAuthKey;
    }

    public void changeRole(Role accountRole){
        this.accountRole=accountRole;
    }

    public void followAccount(Account account){
        this.getFollowing().add(account);
        account.getFollower().add(this);
    }
}
