package fr.isima.etudecaswebmobile.services.location;


import fr.isima.etudecaswebmobile.entities.location.LocationEntity;
import fr.isima.etudecaswebmobile.entities.location.LocationMapper;
import fr.isima.etudecaswebmobile.entities.tag.TagEntity;
import fr.isima.etudecaswebmobile.exception.NoContentException;
import fr.isima.etudecaswebmobile.exception.NotFoundException;
import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.repositories.LocationRepository;
import fr.isima.etudecaswebmobile.services.impl.LocationImpl;
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

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class LocationServiceTest {

    @Mock
    LocationRepository locationRepository;

    @Mock
    LocationMapper locationMapper;

    @InjectMocks
    LocationImpl locationImpl;

    LocationEntity locationEntity1 = new LocationEntity(45.0,50.0);
    LocationEntity locationEntity2 = new LocationEntity(55.0,60.0);
    Location location1 = new Location(1L,"lieu1",45.0,50.0,new ArrayList<Tag>());
    Location location2 = new Location(2L,"lieu2",55.0,60.0,new ArrayList<Tag>());

    private static final String tag_title = "default tag";

    @Before
    public void setup(){


        when(locationMapper.toModel(locationEntity1)).thenReturn(location1);
        when(locationMapper.toModel(locationEntity2)).thenReturn(location2);

        when(locationRepository.findAll()).thenReturn(
                new ArrayList<LocationEntity>(
                        Arrays.asList(locationEntity1, locationEntity2)
                )
        );

        when(locationRepository.findById(1L)).thenReturn(Optional.of(locationEntity1));
        when(locationRepository.findById(3L)).thenReturn(Optional.empty());

        when(locationRepository.save(locationEntity1)).thenReturn(locationEntity1);

    }

    @Test
    public void when_getAll_expect_locations() throws Exception {
        Assertions.assertTrue(locationImpl.getAllLocations().size() == 2);
    }

    @Test
    public void when_getAllNonExisting_expect_204() throws Exception {
        when(locationRepository.findAll()).thenReturn(new ArrayList<>());
        Assertions.assertThrows(NoContentException.class, () -> locationImpl.getAllLocations());
    }

    @Test
    public void when_findById_expect_location() throws Exception{
        Assertions.assertEquals(50.0, locationImpl.getLocationById(1L).getLongitude());
    }

    @Test
    public void when_getByIdNonExisting_expect_404() throws Exception {
        Assertions.assertThrows(NotFoundException.class, () -> locationImpl.getLocationById(3L));
    }

    @Test
    public void when_update_expect_location() throws Exception{
        location1.setTags(new ArrayList<>(Arrays.asList(new Tag(1l, tag_title))));
        locationEntity1.setTagEntities(new ArrayList<>(Arrays.asList(new TagEntity(1l, tag_title))));
        Location location = locationImpl.updateLocationById(location1,1L);
        Assertions.assertEquals("lieu1", location.getLabel());
    }

    @Test
    public void when_delete_expect_location() throws Exception{
        locationImpl.deleteLocationById(1L);
        verify(locationRepository).deleteById(1L);
    }

    @Test
    public void when_deleteNonExisting_expect_404() throws Exception {
        Assertions.assertEquals(locationImpl.deleteLocationById(3L), new ResponseEntity<>(false, HttpStatus.NOT_FOUND));
    }

}
