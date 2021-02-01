package com.a302.webcuration.domain.Tag;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag,Long> {
    Tag findByTagTitle(String tagTitle);
    Tag findTagByTagId(Long id);

}
