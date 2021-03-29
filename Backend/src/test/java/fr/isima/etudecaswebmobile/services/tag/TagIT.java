package fr.isima.etudecaswebmobile.services.tag;

import fr.isima.etudecaswebmobile.entities.user.UserDao;
import fr.isima.etudecaswebmobile.exception.NotFoundException;
import fr.isima.etudecaswebmobile.exception.UnauthorizedException;
import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.services.JwtUserDetailsService;
import fr.isima.etudecaswebmobile.services.impl.TagImpl;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@TestPropertySource(properties = {"spring.config.location=classpath:application.yaml"})
@ActiveProfiles("test")
public class TagIT {

    @MockBean
    JwtUserDetailsService userDetailsService;

    @Autowired
    TagImpl tagImpl;

    private static final String tag_title = "default tag";
    Tag tag = new Tag(2L, "TAG");

    Tag tagToSave = new Tag("TAG_to_Save");
    UserDao connectedUser = new UserDao(1L, "lidouh","mohamed","lidouh@gmail.com", "lidouh", "$2a$10$qqEWBP3BUTo17FThZsxMaOIu5rXWEQCEQ5v4G50GYhsCs8wCQEvCq");

    @Test
    @Transactional
    public void when_findAll_expect_tags() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        Assertions.assertTrue(tagImpl.getAllTags().size() > 0);
    }

    @Test
    @Transactional
    public void when_findById_expect_tag() {
        Assertions.assertEquals(
                tag,
                tagImpl.getTagById(2L)
        );
    }

    @Test
    @Transactional
    public void when_findById_nonexistent_expect_notFound() {
        Assertions.assertThrows(NotFoundException.class, () -> tagImpl.getTagById(-1L));
    }

    @Test
    @Transactional
    public void when_createTag_expect_created() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        assertThat(tagToSave)
                .usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(tagImpl.addTag(tagToSave));
    }

    @Test
    @Transactional
    public void when_createTag_withId_expect_unauthorized() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        Assertions.assertThrows(UnauthorizedException.class, () -> tagImpl.addTag(tag));
    }

    @Test
    @Transactional
    public void when_updateTag_expect_updated() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        tag.setLabel("tag");
        Assertions.assertEquals(
                tag,
                tagImpl.updateTagById(
                        tag,
                        2L
                )
        );
    }

    @Test
    @Transactional
    public void when_updateTag_expect_notFound() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        Assertions.assertThrows(NotFoundException.class, () -> tagImpl.updateTagById(tag, -1L));
    }

    @Test
    @Transactional
    public void when_deleteTag_expect_deleted() {
        Assertions.assertEquals(
                new ResponseEntity<>(true, HttpStatus.OK),
                tagImpl.deleteTagById(3L)
        );
    }

    @Test
    @Transactional
    public void when_deleteTag_nonexistent_expect_false() {
        Assertions.assertEquals(
                new ResponseEntity<>(false, HttpStatus.NOT_FOUND),
                tagImpl.deleteTagById(-1L)
        );
    }

}
