package fr.isima.etudecaswebmobile.controllers;


import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.User;
import fr.isima.etudecaswebmobile.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}
