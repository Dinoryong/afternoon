package com.a302.webcuration.domain.Pin;

import com.a302.webcuration.domain.Comment.CommentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;


public class PinDto {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Pin{
        private Long pinId;
        @NotNull(message = "핀 이름 있어야합니다.")
        private String pinName;
        @NotNull(message = "핀 위치Y가 있어야합니다.")
        private Double pinLocY;
        @NotNull(message = "핀 위치X가 있어야합니다.")
        private Double pinLocX;
        private String pinLink;
        @NotNull(message = "pinNum 사진위치가 있어야합니다.")
        private Integer pinNum;
        private String pinApiLink;
        private String pinApiClass;
        // TODO: 2021-02-13 핀이 가진 코멘트 내용??
        private List<CommentDto.Comments> comments;

        public com.a302.webcuration.domain.Pin.Pin toEntity(){
            return com.a302.webcuration.domain.Pin.Pin.builder()
                    .pinName(this.pinName)
                    .pinLocY(this.pinLocY)
                    .pinLocX(this.pinLocX)
                    .pinLink(this.pinLink)
                    .pinNum(this.pinNum)
                    .pinApiLink(pinApiLink)
                    .pinApiClass(pinApiClass)
                    .build();

        }
    }
}
