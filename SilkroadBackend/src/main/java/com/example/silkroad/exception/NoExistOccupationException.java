package com.example.silkroad.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class NoExistOccupationException extends RuntimeException {
    private final ErrorCode errorCode;
}
