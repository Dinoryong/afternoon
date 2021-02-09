package com.a302.webcuration.domain.Pin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

public class PinDto {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Pin{

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
