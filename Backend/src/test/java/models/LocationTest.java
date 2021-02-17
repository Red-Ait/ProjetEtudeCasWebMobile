package models;

import fr.isima.etudecaswebmobile.models.Location;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class LocationTest {

    @Test
    void cannotBuildWithNullLabel() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Location(null);
        });
    }

    @Test
    void cannotBuildWithEmptyLabel() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Location("");
        });
    }

    @Test
    void cannotBuildWithBlankLabel() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Location("    ");
        });
    }

    @Test
    void cannotBuildWithLabelStartingWithDigit() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Location("1LABEL");
        });
    }

    @Test
    void cannotBuildWithLabelContainingSpaces() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Location("THE LABEL");
        });
    }

    @Test
    void mustReturnItsTitle() {
        assertThat(new Location("isima").getLabel()).isEqualTo("isima");
    }

    @Test
    void mustNotBeEqualToNull() {
        assertThat(new Location("isima").equals(null)).isFalse();
    }

}
