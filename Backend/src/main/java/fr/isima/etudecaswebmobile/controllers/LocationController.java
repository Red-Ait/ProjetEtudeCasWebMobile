package fr.isima.etudecaswebmobile.controllers;


import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @RequestMapping(path = "/location", method = RequestMethod.POST)
    public ResponseEntity<Location> addLocation(@Validated @RequestBody Location location) throws Exception
    {
        return new ResponseEntity<>(this.locationService.addLocation(location), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/location", method = RequestMethod.GET)
    public ResponseEntity<List<Location>> getAll() {
        return new ResponseEntity<>(this.locationService.getAllLocations(), HttpStatus.OK);
    }

    @RequestMapping(value= "/location/{id}", method = RequestMethod.GET)
    public ResponseEntity<Location> getLocationById(@PathVariable long id) {
        return new ResponseEntity<>(this.locationService.getLocationById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/location/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Location> updateLocationById(@Validated @RequestBody Location newLocation, @PathVariable long id)
    {
        return new ResponseEntity<>(this.locationService.updateLocationById(newLocation, id),HttpStatus.CREATED);
    }

    @RequestMapping(value = "/location/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteLocationById(@PathVariable long id)
    {
        return locationService.deleteLocationById(id);
    }

    @RequestMapping(value = "/location/tag/{tag_id}", method = RequestMethod.GET)
    public ResponseEntity<List<Location>> getLocationsByTag(@PathVariable long tag_id)
    {
        return new ResponseEntity<>(this.locationService.getLocationsByTag(tag_id), HttpStatus.OK);
    }

    @GetMapping("location/user/{id_user}")
    public ResponseEntity<List<Location>> getAllLocationsByUserID(@PathVariable("id_user") Long id) {
        return new ResponseEntity<>(locationService.findAllLocationsByUserId(id), HttpStatus.OK);
    }

    @GetMapping("location/shared")
    public ResponseEntity<List<Location>> getAllSharedLocations() {
        return new ResponseEntity<>(locationService.findAllSharedLocations(), HttpStatus.OK);
    }

    @GetMapping("location/owner_user/{owner_username}/tags/{tag_titles}")
    public ResponseEntity<List<Location>> getAllLocationsByTagNames(
            @PathVariable("owner_username") String ownerUsername,
            @PathVariable("tag_titles") List<String> tagTitles
    ) {
        return new ResponseEntity<>(
                locationService.findAllLocationsOfAnotherUserByTagTitles(ownerUsername, tagTitles),
                HttpStatus.OK
        );
    }

    @PutMapping("location/other_user/{other_username}/tags/{tag_titles}")
    public ResponseEntity<String> shareLocationsWithAnotherUserByTagTitles(
            @PathVariable("other_username") String otherUsername,
            @PathVariable("tag_titles") List<String> tagTitles
    ) {
        return new ResponseEntity<>(
                locationService.shareLocationsWithAnotherUserByTagTitles(otherUsername, tagTitles),
                HttpStatus.OK
        );
    }

    @PostMapping("location/tags")
    public ResponseEntity<List<Location>> getListLocationsOfListTags(@Validated @RequestBody List<Tag> tags)
    {
        return new ResponseEntity<>(locationService.getLocationsByTags(tags), HttpStatus.OK);
    }

    @PostMapping("location/tags/mutual")
    public ResponseEntity<List<List<Location>>> getMutualListLocationsOfListTags(@Validated @RequestBody List<Tag> list_tags)
    {
        List<List<Location>> locations = new ArrayList<List<Location>>();

        for(int i = 0; i<list_tags.size(); i++)
        {
            List<Location> locat = this.locationService.getLocationsByTag(list_tags.get(i).getId());

        }
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }

}
