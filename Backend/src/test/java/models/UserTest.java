package models;

import fr.isima.etudecaswebmobile.models.User;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class UserTest {
    @Test
    void cannotBuildWithNullEntities() {
        assertThrows(IllegalArgumentException.class, () -> {
            new User(null,null,null,null,null);
        });
    }

    @Test
    void cannotBuildWithEmptyEntities() {
        assertThrows(IllegalArgumentException.class, () -> {
            new User("","","","","");
        });
    }

    @Test
    void cannotBuildWithBlankEntities() {
        assertThrows(IllegalArgumentException.class, () -> {
            new User("    ","    ","    ","    ","    ");
        });
    }

    @Test
    void cannotBuildWithEntitiesStartingWithDigit() {
        assertThrows(IllegalArgumentException.class, () -> {
            new User("1FIRSTNAME","1LASTNAME","1LASTNAME","LASTNAME","Password123_");
        });
    }

    @Test
    void cannotBuildWithEntitiesContainingSpaces() {
        assertThrows(IllegalArgumentException.class, () -> {
            new User("FIRSTNAME","LASTNAME","THE EMAIL","THE USERNAME","Password123_");
        });
    }

    @Test
    void mustReturnItsgetEntities() {
        assertThat(new User("ouazzani","anass","anass@gmail.com","anassouazzani","Password123_").getFirstName()).isEqualTo("ouazzani","anass","anass@gmail.com","anassouazzani","Password123_");
    }

    @Test
    void mustNotBeEqualToNull() {
        assertThat(new User("ouazzani","anass","anass@gmail.com","anassouazzani","Password123_").equals(null)).isFalse();
    }

}
