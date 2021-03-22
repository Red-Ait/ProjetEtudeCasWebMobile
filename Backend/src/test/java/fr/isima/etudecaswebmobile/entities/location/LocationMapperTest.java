package fr.isima.etudecaswebmobile.entities.location;

import fr.isima.etudecaswebmobile.models.Location;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;


public class LocationMapperTest {

    private final LocationMapper locationMapper = new LocationMapper();
    private final Location LOCATION = new Location();
    private final LocationEntity LOCATIONENTITY = new LocationEntity(1L,"testLabel", 1.1,2.2);

    @Test
    public void when_toModel_expect_location() {
        Assertions.assertEquals(LOCATION, locationMapper.toModel(LOCATIONENTITY));
    }

    @Test
    public void when_fromModel_expect_tagEntity() {
        Assertions.assertEquals(LOCATIONENTITY.getId_location(), locationMapper.fromModel(LOCATION).getId_location());
        Assertions.assertEquals(LOCATIONENTITY.getLabel(), locationMapper.fromModel(LOCATION).getLabel());
        Assertions.assertEquals(LOCATIONENTITY.getLongitude(), locationMapper.fromModel(LOCATION).getLongitude());
        Assertions.assertEquals(LOCATIONENTITY.getLatitude(), locationMapper.fromModel(LOCATION).getLatitude());


    }

}
