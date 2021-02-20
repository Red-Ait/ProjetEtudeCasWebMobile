package fr.isima.etudecaswebmobile.controllers;


import fr.isima.etudecaswebmobile.models.Location;
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


    @PostMapping(path = "/location")
    public ResponseEntity<Location> addLocation(@Validated @RequestBody Location location) {
        return new ResponseEntity<Location>(this.locationService.addLocation(location), HttpStatus.OK);
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

    @RequestMapping(value = "/greeting", method = RequestMethod.GET)
    public String getEmployees()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        return "Welcome! "+currentPrincipalName;
    }

}
