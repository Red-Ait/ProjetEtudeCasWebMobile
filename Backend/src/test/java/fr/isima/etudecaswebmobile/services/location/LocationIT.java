package fr.isima.etudecaswebmobile.services.location;

import fr.isima.etudecaswebmobile.entities.location.LocationEntity;
import fr.isima.etudecaswebmobile.entities.tag.TagEntity;
import fr.isima.etudecaswebmobile.entities.user.UserDao;
import fr.isima.etudecaswebmobile.exception.NotFoundException;
import fr.isima.etudecaswebmobile.exception.UnauthorizedException;
import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.repositories.LocationRepository;
import fr.isima.etudecaswebmobile.repositories.TagRepository;
import fr.isima.etudecaswebmobile.services.JwtUserDetailsService;
import fr.isima.etudecaswebmobile.services.impl.LocationImpl;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@TestPropertySource(properties = {"spring.config.location=classpath:application.yaml"})
@ActiveProfiles("test")
public class LocationIT {

    @MockBean
    JwtUserDetailsService userDetailsService;

    @Autowired
    LocationImpl locationImpl;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    TagRepository tagRepository;

    private static final String tag_title = "default tag";
    Tag defaultTag = new Tag(1L, tag_title);
    Tag tag2 = new Tag(4L, "TAG2");
    Tag tag4 = new Tag(5L, "TAG4");
    Tag tag = new Tag(2L, "TAG");
    Tag tag1 = new Tag(3L, "TAG1");
    Location location1 = new Location(2L, "LOC1", 45.0, 45.0,
           new ArrayList<>(Arrays.asList(defaultTag, tag, tag1))
    );
    Location location2 = new Location(2L, "LOC2", 55.0, 55.0,
           new ArrayList<>(Arrays.asList(defaultTag, tag2, tag4))
    );

    Location location = new Location("LOC", 55.0, 55.0, new ArrayList<>());
    Location locationSaved = new Location("LOC", 55.0, 55.0, new ArrayList<>(Arrays.asList(defaultTag)));

    UserDao connectedUser = new UserDao(1L, "lidouh","mohamed","lidouh@gmail.com", "lidouh", "$2a$10$qqEWBP3BUTo17FThZsxMaOIu5rXWEQCEQ5v4G50GYhsCs8wCQEvCq");
    UserDao connectedUser2 = new UserDao(2L, "cimo2","cimo2","cimo2@gmail.com", "cimo2", "$2a$10$DA0mu7Omul8.pBdIMX7yleQXp/2LHYS1BzZJ37HctplRfgG/QBVgG");
    UserDao connectedUser3 = new UserDao(3L, "achkour","achkour","achkour@gmail.com", "achkour", "$2a$10$DA0mu7Omul8.pBdIMX7yleQXp/2LHYS1BzZJ37HctplRfgG/QBVgG");

    @Test
    @Transactional
    public void when_findAll_expect_locations() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        Assertions.assertTrue(locationImpl.getAllLocations().size() > 0);
    }

    @Test
    @Transactional
    public void when_findAllLocationsByUserId_expect_locations() {
        Assertions.assertTrue(locationImpl.findAllLocationsByUserId(1L).size() > 0);
    }

    @Test
    @Transactional
    public void when_findAllSharedLocations_expect_locations() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser2);
        Assertions.assertTrue(locationImpl.findAllSharedLocations().size() > 0);
    }

    @Test
    @Transactional
    public void when_findAllLocationsOfAnotherUserByTagTitles_expect_locations() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser2);
        Assertions.assertTrue(
                locationImpl.findAllLocationsOfAnotherUserByTagTitles(
                        connectedUser.getUsername(),
                        new ArrayList<>(Arrays.asList(tag1.getLabel(), tag4.getLabel()))
                ).size() > 0
        );
    }

    @Test
    @Transactional
    public void when_findAllLocationsOfAnotherUserByTagTitles_withNonexistentTag_expect_notFound() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser2);
        Assertions.assertThrows(
                NotFoundException.class, () ->
                        locationImpl.findAllLocationsOfAnotherUserByTagTitles(
                                connectedUser.getUsername(),
                                new ArrayList<>(Arrays.asList("test"))
                        )
        );
    }

    @Test
    @Transactional
    public void when_findAllLocationsOfAnotherUserByTagTitles_withoutAccess_expect_unauthorized() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser3);
        Assertions.assertThrows(
                UnauthorizedException.class, () ->
                        locationImpl.findAllLocationsOfAnotherUserByTagTitles(
                                connectedUser.getUsername(),
                                new ArrayList<>(Arrays.asList(tag1.getLabel(), tag4.getLabel()))
                        )
        );
    }

    @Test
    @Transactional
    public void when_findAllLocationsOfAnotherUserByTagTitles_emptyTags_expect_unauthorized() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        Assertions.assertThrows(
                UnauthorizedException.class, () ->
                        locationImpl.findAllLocationsOfAnotherUserByTagTitles(
                                connectedUser.getUsername(),
                                new ArrayList<>()
                        )
        );
    }

    @Test
    @Transactional
    public void when_findById_expect_location() {
        Assertions.assertEquals(
                location2,
                locationImpl.getLocationById(2L)
        );
    }

    @Test
    @Transactional
    public void when_findById_nonexistent_expect_notFound() {
        Assertions.assertThrows(NotFoundException.class, () -> locationImpl.getLocationById(-1L));
    }

    @Test
    @Transactional
    public void when_createLocation_expect_created() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        assertThat(locationSaved)
                .usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(locationImpl.addLocation(location));
    }

    @Test
    @Transactional
    public void when_createLocation_withNonexistentTag_expect_notFound() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        Tag newTag = new Tag(-1L, "test");
        List<Tag> tags = location.getTags();
        tags.add(newTag);
        location.setTags(tags);
        Assertions.assertThrows(NotFoundException.class, () -> locationImpl.addLocation(location));
    }

    @Test
    @Transactional
    public void when_createLocation_withId_expect_unauthorized() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        Assertions.assertThrows(UnauthorizedException.class, () -> locationImpl.addLocation(location2));
    }

    @Test
    @Transactional
    public void when_updateLocation_expect_updated() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        location2.setLabel("LOC_2");
        Assertions.assertEquals(
                location2,
                locationImpl.updateLocationById(
                        location2,
                        2L
                )
        );
    }

    @Test
    @Transactional
    public void when_updateLocation_expect_notFound() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        Assertions.assertThrows(NotFoundException.class, () -> locationImpl.updateLocationById(location, -1L));
    }

    @Test
    @Transactional
    public void when_updateLocation_expect_unauthorized() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        LocationEntity locationEntity = locationRepository.findById(2L).get();
        List<TagEntity> tags = locationEntity.getTagEntities();
        TagEntity defaultTagEntity = tags.stream().filter(tagEntity -> tagEntity.getTitle().equals(defaultTag.getLabel())).findAny().get();
        tags.remove(defaultTagEntity);
        locationEntity.setTagEntities(tags);
        locationRepository.save(locationEntity);
        Assertions.assertThrows(UnauthorizedException.class, () -> locationImpl.updateLocationById(location2, 2L));

        tags.add(defaultTagEntity);
        locationEntity.setTagEntities(tags);
        locationRepository.save(locationEntity);
    }

    @Test
    @Transactional
    public void when_deleteLocation_expect_deleted() {
        Assertions.assertEquals(
                new ResponseEntity<>(true, HttpStatus.OK),
                locationImpl.deleteLocationById(1L)
        );
    }

    @Test
    @Transactional
    public void when_deleteLocation_nonexistent_expect_false() {
        Assertions.assertEquals(
                new ResponseEntity<>(false, HttpStatus.NOT_FOUND),
                locationImpl.deleteLocationById(-1L)
        );
    }

    @Test
    @Transactional
    public void when_shareLocationsWithAnotherUserByTagTitles_expect_link() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        final String baseUrl =
                ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();

        TagEntity tagEntity = tagRepository.findByTitleAndUserDaoUsername(tag.getLabel(), connectedUser.getUsername()).get();
        Assertions.assertFalse(tagEntity.getAccessUserEntities().contains(connectedUser3));

        Assertions.assertEquals(
                baseUrl+"/api/location/owner_user/"+connectedUser.getUsername()+"/tags/"+tag.getLabel(),
                locationImpl.shareLocationsWithAnotherUserByTagTitles(
                        "achkour",
                        new ArrayList<>(Arrays.asList(tag.getLabel()))
                )
        );

        tagEntity = tagRepository.findByTitleAndUserDaoUsername(tag.getLabel(), connectedUser.getUsername()).get();
        Assertions.assertTrue(tagEntity.getAccessUserEntities().contains(connectedUser3));

    }

    @Test
    @Transactional
    public void when_shareLocationsWithAnotherUserByTagTitles_userNonexistent_expect_NotFound() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        Assertions.assertThrows(
                NotFoundException.class, () ->
                        locationImpl.shareLocationsWithAnotherUserByTagTitles(
                                "test",
                                new ArrayList<>(Arrays.asList(tag.getLabel()))
                        )
        );

    }

    @Test
    @Transactional
    public void when_shareLocationsWithAnotherUserByTagTitles_tagNonexistent_expect_NotFound() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        Assertions.assertThrows(
                NotFoundException.class, () ->
                        locationImpl.shareLocationsWithAnotherUserByTagTitles(
                                "achkour",
                                new ArrayList<>(Arrays.asList("test"))
                        )
        );

    }

    @Test
    @Transactional
    public void when_shareLocationsWithAnotherUserByTagTitles_emptyTags_expect_unauthorized() {
        when(userDetailsService.getCurrentUser()).thenReturn(connectedUser);
        Assertions.assertThrows(
                UnauthorizedException.class, () ->
                        locationImpl.shareLocationsWithAnotherUserByTagTitles(
                                "achkour",
                                new ArrayList<>()
                        )
        );

    }

}
