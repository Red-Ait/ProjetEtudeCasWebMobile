package fr.isima.etudecaswebmobile.exception;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;

public class NotFoundExceptionTests {

    @Test
    public void when_getMessage_expect_message() {
        String message = "message";
        NotFoundException exception = new NotFoundException(message);
        Assertions.assertEquals(message,exception.getMessage());
    }
}
