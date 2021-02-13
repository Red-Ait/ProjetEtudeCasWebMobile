package fr.isima.etudecaswebmobile.services.impl;

import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.User;
import fr.isima.etudecaswebmobile.repositories.LocationRepository;
import fr.isima.etudecaswebmobile.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class LocationImpl implements LocationService {


    @Autowired
    private LocationRepository locationRepository;


    @Override
    public List<Location> getAllLocations() {
        List<Location> locations  = this.locationRepository.findAll();
        if (locations.isEmpty())
            return Collections.emptyList();
        else
            return locations;
    }

    @Override
    public Optional<Location> getLocationById(Long id) {
        return locationRepository.findById(id);
    }
}
