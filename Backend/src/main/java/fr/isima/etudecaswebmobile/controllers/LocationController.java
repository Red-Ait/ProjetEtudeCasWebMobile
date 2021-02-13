package fr.isima.etudecaswebmobile.controllers;


import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LocationController {

    @Autowired
    private LocationService locationService;


    @GetMapping(path = "/locations")
    public List<Location> getAll() {
        return this.locationService.getAllLocations();
    }
}
