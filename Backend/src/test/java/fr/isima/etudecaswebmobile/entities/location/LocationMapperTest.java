package fr.isima.etudecaswebmobile.entities.location;

import fr.isima.etudecaswebmobile.models.Location;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;


public class LocationMapperTest {

    private final LocationMapper locationMapper = new LocationMapper();
    private final Location LOCATION = new Location(1L, "testLabel", 1.1 ,2.2, new ArrayList<>());
    private final LocationEntity LOCATIONENTITY = new LocationEntity(1L,"testLabel", 1.1,2.2);

    @Test
    public void when_toModel_expect_location() {
        Assertions.assertEquals(LOCATION, locationMapper.toModel(LOCATIONENTITY));
    }

    @Test
    public void when_fromModel_expect_tagEntity() {
        assertThat(LOCATIONENTITY)
                .isEqualToComparingFieldByFieldRecursively(locationMapper.fromModel(LOCATION));
    }

}
