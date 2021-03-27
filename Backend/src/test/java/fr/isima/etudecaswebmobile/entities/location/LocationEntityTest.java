package fr.isima.etudecaswebmobile.entities.location;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class LocationEntityTest {

    @Test
    void cannotBuildWithNullLabel() {
        assertThrows(IllegalArgumentException.class, () -> {
            new LocationEntity(null);
        });
    }

    @Test
    void cannotBuildWithNullLongitudeAndLatitude() {
        assertThrows(IllegalArgumentException.class, () -> {
            new LocationEntity( null,null);
        });
    }

    @Test
    void cannotBuildWithEmptyLabel() {
        assertThrows(IllegalArgumentException.class, () -> {
            new LocationEntity("");
        });
    }

    @Test
    void cannotBuildWithBlankLabel() {
        assertThrows(IllegalArgumentException.class, () -> {
            new LocationEntity("    ");
        });
    }

    @Test
    void cannotBuildWithLabelStartingWithDigit() {
        assertThrows(IllegalArgumentException.class, () -> {
            new LocationEntity("1LABEL");
        });
    }

    @Test
    void cannotBuildWithLabelContainingSpaces() {
        assertThrows(IllegalArgumentException.class, () -> {
            new LocationEntity("THE label");
        });
    }

    @Test
    void mustReturnItsLabel() {
        assertThat(new LocationEntity("label").getLabel()).isEqualTo("label");

    }

    @Test
    void mustNotBeEqualToNull() {
        assertThat(new LocationEntity("label").equals(null)).isFalse();
        assertThat(new LocationEntity(1.1,1.1).equals(null)).isFalse();

    }


}
