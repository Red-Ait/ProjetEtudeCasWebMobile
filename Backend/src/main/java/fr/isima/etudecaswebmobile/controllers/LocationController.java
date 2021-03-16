package fr.isima.etudecaswebmobile.controllers;


import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.models.UserDao;
import fr.isima.etudecaswebmobile.repositories.UserRepository;
import fr.isima.etudecaswebmobile.services.JwtUserDetailsService;
import fr.isima.etudecaswebmobile.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class LocationController {

    @Autowired
    private LocationService locationService;
    @Autowired
    private JwtUserDetailsService userDetailsService;

    @PostMapping(path = "/location")
    public ResponseEntity<Location> addLocation(@Validated @RequestBody Location location) throws Exception
    {
        return new ResponseEntity<Location>(this.locationService.addLocation(location, "default tag"), HttpStatus.OK);
    }

    @GetMapping(path = "/locations")
    public List<Location> getAll() {
        return this.locationService.getAllLocations();
    }

    @GetMapping(path= "/location/{id}")
    public Optional<Location> getLocationById(@PathVariable long id) {
        return this.locationService.getLocationById(id);
    }

    @RequestMapping(value = "/location/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Location> udpateLocationById(@Validated @RequestBody Location location, @PathVariable long id)
    {
        return new ResponseEntity<Location>(this.locationService.updateLocationById(location, id), HttpStatus.OK);
    }

    @RequestMapping(value = "/location/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Location> deleteLocationById(@PathVariable long id)
    {
        return new ResponseEntity<Location>(this.locationService.deleteLocationById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/locations/tag/{tag_id}", method = RequestMethod.GET)
    public ResponseEntity<List<Location>> getLocationsByTag(@PathVariable long tag_id)
    {
        return new ResponseEntity<List<Location>>(this.locationService.getLocationsByTag(tag_id), HttpStatus.OK);
    }

}
