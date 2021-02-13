package com.a302.webcuration.domain.Comment;

import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CommentDto {
    @Setter @Builder @Getter
    public static class CreateCommentRequest{

        @NotEmpty(message = "내용을 입력하세요.")
        private String commentContent;
        private String commentLink;
        private Long pinId;
        private Long postsId;
        private int pinNum;

        public Comment toEntity()
        {
            return Comment.builder()
                    .commentContent(commentContent)
                    .commentLink(commentLink)
                    .build();
        }
    }

    @Setter  @Getter @RequiredArgsConstructor
    public static class CreateCommentResponse{
        @NotEmpty
        private String commentContent;
        @NotNull
        private String accountNickname;
        private String accountPhoto;
        private String commentLink;

        private Long pinId;
        private int pinNum;
        private String pinName;
    }

    @Data
    public static class Comments{
        private Long commentId;
        private String accountNickname;
        private String accountPhoto;
        private String commentLink;
        private String commentContent;
        private String pinName;
    }
}
