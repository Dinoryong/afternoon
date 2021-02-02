package com.a302.webcuration.domain.Comment;

import com.a302.webcuration.domain.Tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
}
