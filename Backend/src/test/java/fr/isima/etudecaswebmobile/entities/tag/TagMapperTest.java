package fr.isima.etudecaswebmobile.entities.tag;

import fr.isima.etudecaswebmobile.models.Tag;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;

public class TagMapperTest {

    private final TagMapper tagMapper = new TagMapper();
    private final Tag TAG = new Tag(1L,"testTitle");
    private final TagEntity TAGENTITY = new TagEntity(1L,"testTitle");

    @Test
    public void when_toModel_expect_tag() {
        Assertions.assertEquals(TAG, tagMapper.toModel(TAGENTITY));
    }

    @Test
    public void when_fromModel_expect_tagEntity() {
        Assertions.assertEquals(TAGENTITY.getId_tag(), tagMapper.fromModel(TAG).getId_tag());
        Assertions.assertEquals(TAGENTITY.getTitle(), tagMapper.fromModel(TAG).getTitle());
    }


}
