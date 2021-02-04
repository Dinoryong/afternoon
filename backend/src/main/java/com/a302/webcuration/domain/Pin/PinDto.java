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
        private String pinName;
        private Double pinLocY;
        private Double pinLocX;
        private String pinLink;
        private Integer pinNum;

        public com.a302.webcuration.domain.Pin.Pin toEntity(){
            return com.a302.webcuration.domain.Pin.Pin.builder()
                    .pinName(this.pinName)
                    .pinLocY(this.pinLocY)
                    .pinLocX(this.pinLocX)
                    .pinLink(this.pinLink)
                    .pinNum(this.pinNum)
                    .build();

        }
    }
}
