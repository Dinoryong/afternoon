package com.a302.webcuration.domain.Post;

import com.a302.webcuration.domain.Account.Account;
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
    //작성자 (cascade = CascadeType.ALL) 안할시 오류(영속성 전이를 사용하면 부모 엔티티를 저장할 때 자식 엔티티도 함께 저장)
    //post 검색시 작성자도 같이 알아야하므로 (fetch = FetchType.EAGER)
    @ManyToOne
    private Account postWriter;
    @Builder.Default
    @ManyToMany(mappedBy = "posts")
    private List<Tag> tags=new ArrayList<>();



}
