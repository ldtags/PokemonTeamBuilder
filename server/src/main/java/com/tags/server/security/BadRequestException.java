package com.tags.server.security;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus( value = HttpStatus.BAD_REQUEST, reason="Bad Request" )
public class BadRequestException extends Exception {
    public BadRequestException() {}

    public BadRequestException( String message ) {
        super( message );
    }
}
