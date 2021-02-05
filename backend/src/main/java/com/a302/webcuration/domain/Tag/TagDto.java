package com.a302.webcuration.domain.Tag;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class TagDto {
    @Data @NoArgsConstructor @AllArgsConstructor
    @Builder
    public static class Tag{
        private Long tagId;
    }
}
