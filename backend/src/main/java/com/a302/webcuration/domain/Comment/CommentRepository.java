package com.a302.webcuration.domain.Comment;

import com.a302.webcuration.domain.Tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {
}
