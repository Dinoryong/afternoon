package com.a302.webcuration.domain.Pin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class PinDto {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Pin{
        private Double pinLocY;
        private Double pinLocX;
        private String pinLink;
        private String pinContents;
        private Integer pinNum;

        public com.a302.webcuration.domain.Pin.Pin toEntity(){
            return com.a302.webcuration.domain.Pin.Pin.builder()
                    .pinLocY(this.pinLocY)
                    .pinLocX(this.pinLocX)
                    .pinLink(this.pinLink)
                    .pinContents(this.pinContents)
                    .pinNum(this.pinNum)
                    .build();

        }
    }
}
