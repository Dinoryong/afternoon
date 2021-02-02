package com.a302.webcuration.ExceptionHandler;

public class InvalidTokenException extends RuntimeException{

    public InvalidTokenException() {
    }

    public InvalidTokenException(String message) {
        super(message);
    }
}
