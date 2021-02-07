package com.a302.webcuration.domain.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostsRepository extends JpaRepository<Posts,Long> {
    Posts findPostsByPostsId(Long id);
    @Query(value = "select p.postsId, p.postsTitle, ph, w.accountNickname from Account a join a.tags t join t.posts p join p.postsPhotos ph join p.postWriter w where a.accountId = :accountId order by p.postsWriteTime")
    List<Object[]> selectByMyTag(@Param("accountId") Long accountId);
    @Query(value = "select p.postsId, p.postsTitle, ph, f.accountNickname from Account a join a.following f join f.myPosts p join p.postsPhotos ph where a.accountId = :accountId order by p.postsWriteTime")
    List<Object[]> selectByMyFollowing(@Param("accountId") Long accountId);
}
