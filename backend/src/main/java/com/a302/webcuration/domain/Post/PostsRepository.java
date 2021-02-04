package com.a302.webcuration.domain.Post;

import com.a302.webcuration.domain.Account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostsRepository extends JpaRepository<Posts,Long> {
    Posts findPostsByPostsId(Long id);

    @Query(value = "select p from Account a join a.tags t join t.posts p where a.accountId = :accountId order by p.postsWriteTime")
    List<Posts> selectByMyTag(@Param("accountId") Long accountId);
    @Query(value = "select p from Account a join a.following f join f.myPosts p where a.accountId = :accountId order by p.postsWriteTime")
    List<Posts> selectByMyFollowing(@Param("accountId") Long accountId);
}
