package models;

import fr.isima.etudecaswebmobile.models.Tag;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class TagTest {

    @Test
    void cannotBuildWithNullTitle() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Tag(null);
        });
    }

    @Test
    void cannotBuildWithEmptyTitle() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Tag("");
        });
    }

    @Test
    void cannotBuildWithBlankTitle() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Tag("    ");
        });
    }

    @Test
    void cannotBuildWithTitleStartingWithDigit() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Tag("1TITLE");
        });
    }

    @Test
    void cannotBuildWithNameContainingSpaces() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Tag("THE TITLE");
        });
    }

    @Test
    void mustReturnItsTitle() {
        assertThat(new Tag("hotel").getTitle()).isEqualTo("hotel");
    }

    @Test
    void mustNotBeEqualToNull() {
        assertThat(new Tag("hotel").equals(null)).isFalse();
    }


}
