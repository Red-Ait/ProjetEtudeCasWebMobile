package fr.isima.etudecaswebmobile.services.location;


import fr.isima.etudecaswebmobile.entities.location.LocationEntity;
import fr.isima.etudecaswebmobile.entities.location.LocationMapper;
import fr.isima.etudecaswebmobile.entities.tag.TagEntity;
import fr.isima.etudecaswebmobile.entities.user.UserDao;
import fr.isima.etudecaswebmobile.exception.NoContentException;
import fr.isima.etudecaswebmobile.exception.NotFoundException;
import fr.isima.etudecaswebmobile.exception.UnauthorizedException;
import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.repositories.LocationRepository;
import fr.isima.etudecaswebmobile.repositories.TagRepository;
import fr.isima.etudecaswebmobile.repositories.UserRepository;
import fr.isima.etudecaswebmobile.services.JwtUserDetailsService;
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
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class LocationServiceTest {

    @Mock
    UserRepository userRepository;

    @Mock
    TagRepository tagRepository;

    @Mock
    LocationRepository locationRepository;

    @Mock
    LocationMapper locationMapper;

    @Mock
    JwtUserDetailsService userDetailsService;

    @InjectMocks
    LocationImpl locationImpl;

    UserDao connectedUser = new UserDao(1L, "achkour","achkour","achkour@gmail.com", "achkour", "$2a$10$DA0mu7Omul8.pBdIMX7yleQXp/2LHYS1BzZJ37HctplRfgG/QBVgG");
    UserDao connectedUser2 = new UserDao(2L, "cimo2","cimo2","cimo2@gmail.com", "cimo2", "$2a$10$DA0mu7Omul8.pBdIMX7yleQXp/2LHYS1BzZJ37HctplRfgG/QBVgG");

    Tag defaultTag = new Tag(1L, tag_title);
    Tag tag = new Tag(2L, "TAG");
    Tag tag4 = new Tag(5L, "TAG4");
    Tag tag1 = new Tag(3L, "TAG1");

    TagEntity tagEntity = new TagEntity(2L, "TAG");
    TagEntity defaultTagEntity = new TagEntity(1L, tag_title);
    TagEntity tag4Entity = new TagEntity(5L, "TAG4");
    TagEntity tag1Entity = new TagEntity(3L, "TAG1");

    LocationEntity locationEntity1 = new LocationEntity(null,"lieu3",45.0,50.0);
    LocationEntity locationEntity2 = new LocationEntity(null,"lieu3",55.0,60.0);
    LocationEntity locationEntity3 = new LocationEntity(null,"lieu3",55.0,60.0, new ArrayList<>());
    LocationEntity locationEntity3_saved = new LocationEntity(null,"lieu3",55.0,60.0, new ArrayList<>(Arrays.asList(defaultTagEntity)));
    LocationEntity locationEntity4 = new LocationEntity(4L,"lieu4",55.0,60.0, new ArrayList<>(Arrays.asList(defaultTagEntity)));
    Location location1 = new Location(1L,"lieu1",45.0,50.0,new ArrayList<Tag>());
    Location location2 = new Location(2L,"lieu2",55.0,60.0,new ArrayList<Tag>());
    Location location3 = new Location(null,"lieu3",55.0,60.0, new ArrayList<>());
    Location location3_saved = new Location(3L,"lieu3",55.0,60.0, new ArrayList<>(Arrays.asList(defaultTag)));
    Location location4 = new Location(4L,"lieu4",55.0,60.0, new ArrayList<>(Arrays.asList(defaultTag)));

    private static final String tag_title = "default tag";

    @Before
    public void setup(){

        when(locationMapper.toModel(locationEntity1)).thenReturn(location1);
        when(locationMapper.toModel(locationEntity2)).thenReturn(location2);
        when(locationMapper.toModel(locationEntity3)).thenReturn(location3);
        when(locationMapper.toModel(locationEntity3_saved)).thenReturn(location3_saved);
        when(locationMapper.fromModel(location3)).thenReturn(locationEntity3);
        when(locationMapper.toModel(locationEntity4)).thenReturn(location4);

        when(locationRepository.findAll()).thenReturn(
                new ArrayList<LocationEntity>(
                        Arrays.asList(locationEntity1, locationEntity2)
                )
        );
        when(locationRepository.findAllLocationsByUserId(1L)).thenReturn(
                Optional.of(
                        new ArrayList<LocationEntity>(
                                Arrays.asList(locationEntity1, locationEntity2)
                        )
                )
        );
        when(locationRepository.findAllSharedLocationsByUserId(2L)).thenReturn(
                Optional.of(
                        new ArrayList<LocationEntity>(
                                Arrays.asList(locationEntity1, locationEntity2)
                        )
                )
        );

        when(locationRepository.findById(1L)).thenReturn(Optional.of(locationEntity1));
        when(locationRepository.findById(4L)).thenReturn(Optional.of(locationEntity4));
        when(locationRepository.findById(3L)).thenReturn(Optional.empty());

        when(locationRepository.save(locationEntity1)).thenReturn(locationEntity1);
        when(locationRepository.save(locationEntity3_saved)).thenReturn(locationEntity3_saved);
        when(locationRepository.save(locationEntity4)).thenReturn(locationEntity4);

    }

    @Test
    public void when_getAll_expect_locations() throws Exception {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        Assertions.assertTrue(locationImpl.getAllLocations().size() == 2);
    }

    @Test
    public void when_getAllNonExisting_expect_204() throws Exception {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        when(locationRepository.findAllLocationsByUserId(connectedUser.getId())).thenReturn(Optional.empty());
        Assertions.assertThrows(NoContentException.class, () -> locationImpl.getAllLocations());
    }

    @Test
    public void when_findAllLocationsByUserId_expect_locations() {
        Assertions.assertTrue(locationImpl.findAllLocationsByUserId(1L).size() > 0);
    }

    @Test
    public void when_findAllLocationsByUserId_nonexistent_expect_noContent() {
        when(locationRepository.findAllLocationsByUserId(-1L)).thenReturn(
                Optional.empty()
        );
        Assertions.assertThrows(NoContentException.class, () -> locationImpl.findAllLocationsByUserId(-1L));
    }

    @Test
    public void when_findAllSharedLocations_expect_locations() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser2);
        Assertions.assertTrue(locationImpl.findAllSharedLocations().size() > 0);
    }

    @Test
    public void when_findAllSharedLocations_nonexistent_expect_noContent() {
        when(locationRepository.findAllLocationsByUserId(-1L)).thenReturn(
                Optional.empty()
        );
        Assertions.assertThrows(NoContentException.class, () -> locationImpl.findAllLocationsByUserId(-1L));
    }

    @Test
    public void when_findAllLocationsOfAnotherUserByTagTitles_tagsWithoutLocations_expect_NoContent() {
        tag4Entity.getAccessUserEntities().add(connectedUser2);
        tag1Entity.getAccessUserEntities().add(connectedUser2);
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser2);
        when(tagRepository.findByTitleAndUserDaoUsername(
                tag4Entity.getTitle(),
                connectedUser.getUsername()
        )).thenReturn(Optional.of(tag4Entity));
        when(tagRepository.findByTitleAndUserDaoUsername(
                tag1Entity.getTitle(),
                connectedUser.getUsername()
        )).thenReturn(Optional.of(tag1Entity));

        Assertions.assertThrows(NoContentException.class, () -> locationImpl.findAllLocationsOfAnotherUserByTagTitles(
                connectedUser.getUsername(),
                new ArrayList<>(Arrays.asList(tag1.getLabel(), tag4.getLabel()))
        ));

    }

    @Test
    public void when_findAllLocationsOfAnotherUserByTagTitles_withoutAccess_expect_unauthorized() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser2);
        when(tagRepository.findByTitleAndUserDaoUsername(
                tag1Entity.getTitle(),
                connectedUser.getUsername()
        )).thenReturn(Optional.of(tag1Entity));

        Assertions.assertThrows(UnauthorizedException.class, () -> locationImpl.findAllLocationsOfAnotherUserByTagTitles(
                connectedUser.getUsername(),
                new ArrayList<>(Arrays.asList(tag1.getLabel(), tag4.getLabel()))
        ));
    }

    @Test
    public void when_findAllLocationsOfAnotherUserByTagTitles_emptyTags_expect_unauthorized() {
        Assertions.assertThrows(UnauthorizedException.class, () -> locationImpl.findAllLocationsOfAnotherUserByTagTitles(
                connectedUser.getUsername(),
                new ArrayList<>()
        ));
    }

    @Test
    public void when_findAllLocationsOfAnotherUserByTagTitles_expect_locations2() {
        tag4Entity.getAccessUserEntities().add(connectedUser2);
        tag1Entity.getAccessUserEntities().add(connectedUser2);
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser2);
        when(tagRepository.findByTitleAndUserDaoUsername(
                tag4Entity.getTitle(),
                connectedUser.getUsername()
        )).thenReturn(Optional.of(tag4Entity));
        when(tagRepository.findByTitleAndUserDaoUsername(
                tag1Entity.getTitle(),
                connectedUser.getUsername()
        )).thenReturn(Optional.of(tag1Entity));

        Assertions.assertThrows(NoContentException.class, () -> locationImpl.findAllLocationsOfAnotherUserByTagTitles(
                connectedUser.getUsername(),
                new ArrayList<>(Arrays.asList(tag1.getLabel(), tag4.getLabel()))
        ));
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

    @Test
    public void when_createLocation_expect_created() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        when(tagRepository.findByTitleAndUserDaoUsername(
                tag_title,
                connectedUser.getUsername()
        )).thenReturn(Optional.empty());
        assertThat(location3_saved)
                .usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(locationImpl.addLocation(location3));
    }

    @Test
    public void when_createLocation_withNonexistentTag_expect_notFound() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        when(tagRepository.findByTitleAndUserDaoUsername(
                anyString(),
                anyString()
        )).thenReturn(Optional.empty());

        Tag newTag = new Tag(-1L, "test");
        List<Tag> tags = location3.getTags();
        tags.add(newTag);
        location3.setTags(tags);

        Assertions.assertThrows(NotFoundException.class, () -> locationImpl.addLocation(location3));
    }

    @Test
    public void when_createLocation_withId_expect_unauthorized() {
        Assertions.assertThrows(UnauthorizedException.class, () -> locationImpl.addLocation(location2));
    }

    @Test
    public void when_updateLocation_expect_updated() {
        location4.setLabel("LOC_4");
        Assertions.assertEquals(
                location4,
                locationImpl.updateLocationById(
                        location4,
                        4L
                )
        );
    }

    @Test
    public void when_updateLocation_expect_notFound() {
        Assertions.assertThrows(NotFoundException.class, () -> locationImpl.updateLocationById(location4, -1L));
    }

    @Test
    public void when_updateLocation_expect_unauthorized() {
        Assertions.assertThrows(UnauthorizedException.class, () -> locationImpl.updateLocationById(location1, 1L));
    }

    @Test
    public void when_shareLocationsWithAnotherUserByTagTitles_expect_link() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        when(userRepository.findByUsername(connectedUser2.getUsername())).thenReturn(connectedUser2);
        when(tagRepository.findByTitleAndUserDaoUsername(
                anyString(),
                anyString()
        )).thenReturn(Optional.of(tagEntity));

        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        final String baseUrl =
                ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();

        Assertions.assertEquals(
                baseUrl+"/api/location/owner_user/"+connectedUser.getUsername()+"/tags/"+tag.getLabel(),
                locationImpl.shareLocationsWithAnotherUserByTagTitles(
                        connectedUser2.getUsername(),
                        new ArrayList<>(Arrays.asList(tag.getLabel()))
                )
        );

    }

    @Test
    public void when_shareLocationsWithAnotherUserByTagTitles_userNonexistent_expect_NotFound() {
        Assertions.assertThrows(
                NotFoundException.class, () ->
                        locationImpl.shareLocationsWithAnotherUserByTagTitles(
                                "test",
                                new ArrayList<>(Arrays.asList(tag.getLabel()))
                        )
        );

    }

    @Test
    public void when_shareLocationsWithAnotherUserByTagTitles_tagNonexistent_expect_NotFound() {
        Assertions.assertThrows(
                NotFoundException.class, () ->
                        locationImpl.shareLocationsWithAnotherUserByTagTitles(
                                connectedUser2.getUsername(),
                                new ArrayList<>(Arrays.asList("test"))
                        )
        );

    }

    @Test
    public void when_shareLocationsWithAnotherUserByTagTitles_emptyTags_expect_unauthorized() {
        when(userRepository.findByUsername(connectedUser2.getUsername())).thenReturn(connectedUser2);
        Assertions.assertThrows(
                UnauthorizedException.class, () ->
                        locationImpl.shareLocationsWithAnotherUserByTagTitles(
                                connectedUser2.getUsername(),
                                new ArrayList<>()
                        )
        );

    }

}
