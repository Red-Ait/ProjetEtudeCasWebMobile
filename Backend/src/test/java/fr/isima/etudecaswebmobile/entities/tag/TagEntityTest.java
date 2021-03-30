package fr.isima.etudecaswebmobile.entities.tag;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class TagEntityTest {

    @Test
    void cannotBuildWithNullTitle() {
        assertThrows(IllegalArgumentException.class, () -> {
            new TagEntity(null);
        });
    }

    @Test
    void cannotBuildWithEmptyTitle() {
        assertThrows(IllegalArgumentException.class, () -> {
            new TagEntity("");
        });
    }

    @Test
    void cannotBuildWithBlankTitle() {
        assertThrows(IllegalArgumentException.class, () -> {
            new TagEntity("    ");
        });
    }

    @Test
    void cannotBuildWithTitleStartingWithDigit() {
        assertThrows(IllegalArgumentException.class, () -> {
            new TagEntity("1ROLE");
        });
    }

    @Test
    void cannotBuildWithTitleContainingSpaces() {
        assertThrows(IllegalArgumentException.class, () -> {
            new TagEntity("THE, tag");
        });
    }

    @Test
    void mustReturnItsTitle() {
        assertThat(new TagEntity("tag").getTitle()).isEqualTo("tag");
    }

    @Test
    void mustNotBeEqualToNull() {
        assertThat(new TagEntity("tag").equals(null)).isFalse();
    }

}
