package com.a302.webcuration.domain.Tag;

import com.a302.webcuration.domain.Account.Account;
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

    @OneToMany(mappedBy = "parent")
    @Builder.Default
    private List<Tag> child=new ArrayList<>();

    @ManyToMany(mappedBy = "tags")
    @Builder.Default
    private List<Account> accounts=new ArrayList<>();

    @ManyToMany(mappedBy = "tags")
    @Builder.Default
    private List<Posts> posts=new ArrayList<>();

    public void setParent(Tag parent) {
        this.parent = parent;
        parent.getChild().add(this);
    }
}
