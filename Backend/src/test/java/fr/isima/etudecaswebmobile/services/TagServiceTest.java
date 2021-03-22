package fr.isima.etudecaswebmobile.services;

import fr.isima.etudecaswebmobile.entities.tag.TagEntity;
import fr.isima.etudecaswebmobile.entities.tag.TagMapper;
import fr.isima.etudecaswebmobile.exception.NoContentException;
import fr.isima.etudecaswebmobile.exception.NotFoundException;
import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.repositories.TagRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class TagServiceTest {

    @Mock
    TagRepository tagRepository;

    @Mock
    TagMapper tagMapper;

    @InjectMocks
    TagService tagService;

    @Before
    public void setup(){
        TagEntity tagEntity1 = new TagEntity(1L,"TitleTest");
        TagEntity tagEntity2 = new TagEntity(2L,"TitleTest2");
        Tag tag1 = new Tag(1L,"TitleTest");
        Tag tag2 = new Tag(2L,"TitleTest2");

        when(tagMapper.toModel(tagEntity1)).thenReturn(tag1);
        when(tagMapper.toModel(tagEntity1)).thenReturn(tag2);
        when(tagMapper.fromModel(tag1)).thenReturn(tagEntity1);

        when(tagRepository.findAll()).thenReturn(
                new ArrayList<TagEntity>(
                        Arrays.asList(tagEntity1, tagEntity2)
                )
        );

        when(tagRepository.findById(1L)).thenReturn(Optional.of(tagEntity1));
        when(tagRepository.findById(3L)).thenReturn(Optional.empty());

        when(tagRepository.save(tagEntity1)).thenReturn(tagEntity1);

    }

    @Test
    public void when_getAll_expect_tags() throws Exception {
        Assertions.assertTrue(tagService.getAllTags().size() == 2);
    }

    @Test
    public void when_getAllNonExisting_expect_204() throws Exception {
        when(tagRepository.findAll()).thenReturn(new ArrayList<>());
        Assertions.assertThrows(NoContentException.class, () -> tagService.getAllTags());
    }

    @Test
    public void when_findById_expect_tag() throws Exception{
        Assertions.assertEquals("TitleTest", tagService.getTagById(1L).getLabel());
    }

    @Test
    public void when_getByIdNonExisting_expect_404() throws Exception {
        Assertions.assertThrows(NotFoundException.class, () -> tagService.getTagById(3L));
    }

    /*
    @Test
    public void when_update_expect_tag() throws Exception{
        Tag t = tagService.updateTagById(new Tag(1L,"TitleTest",[]));
        Assertions.assertEquals("NameTest", t.getTitle());
    }
     */

    @Test
    public void when_delete_expect_tag() throws Exception{
        tagService.deleteTagById(1L);
        verify(tagRepository).deleteById(1L);
        // Assertions.assertEquals("TitleTest", t.getLabel());
    }

    @Test
    public void when_deleteNonExisting_expect_404() throws Exception {
        Assertions.assertThrows(NotFoundException.class, () -> tagService.deleteTagById(2L));
    }


}
