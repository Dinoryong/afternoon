package com.a302.webcuration.domain.Tag;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class TagDto {
    @Data @NoArgsConstructor @AllArgsConstructor
    @Builder
    public static class Tag{
        private String tagTitle;
        private String tagDesc;

        public com.a302.webcuration.domain.Tag.Tag toEntity(){
            return com.a302.webcuration.domain.Tag.Tag.builder()
                    .tagTitle(tagTitle)
                    .tagDesc(tagDesc)
                    .build();
        }
    }
}
