package com.a302.webcuration.common;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class BaseMessage {

    private BaseStatus status;
    private String message;
    private Object data;
}
