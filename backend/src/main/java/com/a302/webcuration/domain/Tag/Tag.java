package com.a302.webcuration.domain.Tag;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter @NoArgsConstructor @AllArgsConstructor
public class Tag {
    @Column(name = "tag_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
}
