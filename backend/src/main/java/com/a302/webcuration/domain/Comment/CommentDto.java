package com.a302.webcuration.domain.Comment;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

public class CommentDto {
    @Setter @Builder @Getter
    public static class CreateCommentRequest{

        @NotEmpty(message = "내용을 입력하세요.")
        private String commentContent;

        private String commentLink;

        private Long pinId;
        private int pinNum;

        public Comment toEntity()
        {
            return Comment.builder()
                    .commentContent(commentContent)
                    .commentLink(commentLink)
                    .build();
        }

    }

}
