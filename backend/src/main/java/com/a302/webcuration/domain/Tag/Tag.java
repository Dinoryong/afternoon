package com.a302.webcuration.domain.Tag;

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
    private String tagTitle;
    private String tagDesc;
    private int tagUserCount;
    @ManyToOne
    private Tag parent;
    @OneToMany(mappedBy = "parent")
    @Builder.Default
    private List<Tag> child=new ArrayList<>();

}
