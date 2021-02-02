package com.a302.webcuration.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

@Getter @RequiredArgsConstructor
public class BaseMessage {

    private HttpStatus httpStatus;
    private HttpHeaders headers;
    private Object data;

    public BaseMessage(HttpStatus httpStatus)
    {
        this.httpStatus = httpStatus;
    }

    public BaseMessage(HttpStatus httpStatus, Object info) {
        this.httpStatus = httpStatus;
        data = info;
    }

    public BaseMessage(HttpStatus httpStatus, HttpHeaders headers, Object info) {
        this.httpStatus = httpStatus;
        this.headers = headers;
        data = info;
    }
}
