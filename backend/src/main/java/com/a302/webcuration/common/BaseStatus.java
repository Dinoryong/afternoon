package com.a302.webcuration.common;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum BaseStatus {

    OK(200, "OK"),
    CREATED(201, "CREATED"),
    NO_CONTENT(204,"NO_CONTENT"),
    BAD_REQUEST(400, "BAD_REQUEST"),
    FORBIDDEN(403,"FORBIDDEN"),
    NOT_FOUND(404, "NOT_FOUND"),
    INTERNAL_SERER_ERROR(500, "INTERNAL_SERVER_ERROR");

    int httpStatusCode;
    String httpStatus;

}
