package fr.isima.etudecaswebmobile.exception;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;

public class NoContentExceptionTests {
    @Test
    public void when_getMessage_expect_message() {
        String message = "message";
        NoContentException exception = new NoContentException(message);
        Assertions.assertEquals(message,exception.getMessage());
    }
}
