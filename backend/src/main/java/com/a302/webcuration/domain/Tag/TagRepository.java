package com.a302.webcuration.domain.Tag;

import com.a302.webcuration.domain.Account.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag,Long> {
    Tag findByTagTitle(String tagTitle);
    Tag findTagByTagId(Long id);
    @Query(value = "select p.postWriter from Tag t join t.posts p where t.tagId = :tagId order by p.likeAccounts.size")
    List<Account> selectMostPopularPosts(@Param("tagId") Long tagId);
    @Query(value = "select p.postsId, p.likeAccounts.size from Tag t join t.posts p where t.tagId = :tagId order by p.likeAccounts.size DESC")
    List<Object[]> selectsMostPopularPosts(@Param("tagId") Long tagId);

}
