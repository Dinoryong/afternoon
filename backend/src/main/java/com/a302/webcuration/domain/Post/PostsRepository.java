package com.a302.webcuration.domain.Post;

import com.a302.webcuration.domain.Account.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostsRepository extends JpaRepository<Posts,Long> {
    Posts findPostsByPostsId(Long id);
}
