package fr.isima.etudecaswebmobile.controllers;


import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.User;
import fr.isima.etudecaswebmobile.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class LocationController {

    @Autowired
    private LocationService locationService;


    @GetMapping(path = "/locations")
    public List<Location> getAll() {
        return this.locationService.getAllLocations();
    }

    @GetMapping(path= "/location/{id}")
    public Optional<Location> getLocationById(@PathVariable long id) {
        return this.locationService.getLocationById(id);
    }
}
