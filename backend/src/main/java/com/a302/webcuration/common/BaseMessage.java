package com.a302.webcuration.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.validation.Errors;

@Getter @RequiredArgsConstructor
public class BaseMessage {

    private BaseStatus status;
    private Object Info;
    private Object headers;


    public BaseMessage(BaseStatus status, Object info) {
        this.status = status;
        Info = info;
    }

    public BaseMessage(BaseStatus status, Object info, Object headers) {
        this.status = status;
        Info = info;
        this.headers = headers;
    }
}
