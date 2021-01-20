package com.a302.webcuration.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor @Getter
public class BaseMessage {

    private BaseStatus status;
    private Object Info;

}