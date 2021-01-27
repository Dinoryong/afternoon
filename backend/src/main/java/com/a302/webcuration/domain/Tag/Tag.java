package com.a302.webcuration.domain.Tag;

import com.a302.webcuration.domain.Account.Account;
import com.a302.webcuration.domain.Post.Posts;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter @NoArgsConstructor @AllArgsConstructor @Builder
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tagId;
    //태그 정보
    @Column(unique = true)
    private String tagTitle;

    private String tagDesc;

    @Builder.Default
    @ManyToOne
    private Tag parent=null;

    @JsonIgnore
    @OneToMany(mappedBy = "parent")
    @Builder.Default
    private List<Tag> child=new ArrayList<>();
    //Hibernate MultipleBagFetchException 때문에 List-> Set으로 https://perfectacle.github.io/2019/05/01/hibernate-multiple-bag-fetch-exception/
    @ManyToMany
    @Builder.Default
    private Set<Account> accounts=new HashSet<>();

    @ManyToMany
    @Builder.Default
    private Set<Posts> posts=new HashSet<>();

    public void setParent(Tag parent) {
        this.parent = parent;
        parent.getChild().add(this);
    }
}
