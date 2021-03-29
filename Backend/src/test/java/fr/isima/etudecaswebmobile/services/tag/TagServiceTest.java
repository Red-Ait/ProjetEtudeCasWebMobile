package fr.isima.etudecaswebmobile.services.tag;

import fr.isima.etudecaswebmobile.entities.tag.TagEntity;
import fr.isima.etudecaswebmobile.entities.tag.TagMapper;
import fr.isima.etudecaswebmobile.entities.user.UserDao;
import fr.isima.etudecaswebmobile.exception.NoContentException;
import fr.isima.etudecaswebmobile.exception.NotFoundException;
import fr.isima.etudecaswebmobile.exception.UnauthorizedException;
import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.repositories.TagRepository;
import fr.isima.etudecaswebmobile.services.JwtUserDetailsService;
import fr.isima.etudecaswebmobile.services.impl.TagImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class TagServiceTest {

    @Mock
    TagRepository tagRepository;

    @Mock
    TagMapper tagMapper;

    @Mock
    JwtUserDetailsService userDetailsService;

    @InjectMocks
    TagImpl tagImpl;

    UserDao connectedUser = new UserDao(1L, "achkour","achkour","achkour@gmail.com", "achkour", "$2a$10$DA0mu7Omul8.pBdIMX7yleQXp/2LHYS1BzZJ37HctplRfgG/QBVgG");

    TagEntity tagEntity1 = new TagEntity(1L,"TitleTest");
    TagEntity tagEntity2 = new TagEntity(2L,"TitleTest2");
    TagEntity tagEntity3 = new TagEntity(3L,"TitleTest3");
    Tag tag1 = new Tag(1L,"TitleTest");
    Tag tag2 = new Tag(2L,"TitleTest2");
    Tag tag3 = new Tag(null,"TitleTest3");
    @Before
    public void setup(){


        when(tagMapper.toModel(tagEntity1)).thenReturn(tag1);
        when(tagMapper.toModel(tagEntity2)).thenReturn(tag2);
        when(tagMapper.toModel(tagEntity3)).thenReturn(tag3);
        when(tagMapper.fromModel(tag3)).thenReturn(tagEntity3);

        when(tagRepository.findById(1L)).thenReturn(Optional.of(tagEntity1));
        when(tagRepository.findById(3L)).thenReturn(Optional.empty());

        when(tagRepository.save(tagEntity1)).thenReturn(tagEntity1);
        when(tagRepository.save(tagEntity3)).thenReturn(tagEntity3);

    }

    @Test
    public void when_getAll_expect_tags() throws Exception {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        when(tagRepository.getUserTags(connectedUser.getId())).thenReturn(
                new ArrayList<TagEntity>(
                        Arrays.asList(tagEntity1, tagEntity2)
                )
        );
        Assertions.assertTrue(tagImpl.getAllTags().size() == 2);
    }

    @Test
    public void when_getAllNonExisting_expect_204() throws Exception {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        when(tagRepository.getUserTags(connectedUser.getId())).thenReturn(new ArrayList<>());
        Assertions.assertThrows(NoContentException.class, () -> tagImpl.getAllTags());
    }

    @Test
    public void when_findById_expect_tag() throws Exception{
        Assertions.assertEquals("TitleTest", tagImpl.getTagById(1L).getLabel());
    }

    @Test
    public void when_getByIdNonExisting_expect_404() throws Exception {
        Assertions.assertThrows(NotFoundException.class, () -> tagImpl.getTagById(3L));
    }

    @Test
    public void when_createTag_expect_created() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        assertThat(tag3)
                .usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(tagImpl.addTag(tag3));
    }

    @Test
    public void when_createTag_withId_expect_unauthorized() {
        Assertions.assertThrows(UnauthorizedException.class, () -> tagImpl.addTag(tag1));
    }

    @Test
    public void when_update_expect_tag() throws Exception{
        Tag t = tagImpl.updateTagById(tag1,1L);
        Assertions.assertEquals("TitleTest", t.getLabel());
    }

    @Test
    public void when_updateTag_expect_notFound() {
        Assertions.assertThrows(NotFoundException.class, () -> tagImpl.updateTagById(tag1, -1L));
    }

    @Test
    public void when_delete_expect_tag() throws Exception{
        tagImpl.deleteTagById(1L);
        verify(tagRepository).deleteById(1L);
    }

    @Test
    public void when_deleteNonExisting_expect_404() throws Exception {
        Assertions.assertEquals(tagImpl.deleteTagById(3L), new ResponseEntity<>(false, HttpStatus.NOT_FOUND));
    }


}
