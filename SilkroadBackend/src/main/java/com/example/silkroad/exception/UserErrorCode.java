package com.example.silkroad.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UserErrorCode implements ErrorCode{
    NOT_EXIST_OCCUPATION(HttpStatus.FORBIDDEN, "Occupation doesn't exist"),
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
