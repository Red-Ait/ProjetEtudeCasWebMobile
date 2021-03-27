package fr.isima.etudecaswebmobile.exception;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;

public class UnauthorizedExceptionTests {

    @Test
    public void when_getMessage_expect_message() {
        String message = "message";
        UnauthorizedException exception = new UnauthorizedException(message);
        Assertions.assertEquals(message,exception.getMessage());
    }
}
