package com.a302.webcuration.domain.Post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @NoArgsConstructor @AllArgsConstructor
public class Posts {
    @Column(name = "posts_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
}
