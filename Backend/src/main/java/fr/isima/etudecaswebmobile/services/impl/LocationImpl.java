package fr.isima.etudecaswebmobile.services.impl;

import fr.isima.etudecaswebmobile.models.Location;
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
    public Location addLocation(Location location) {
        return locationRepository.save(location);
    }

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

    @Override
    public Location updateLocationById(Location newLocation, Long id)
    {
        Optional<Location> oldLocation = this.getLocationById(id);
        oldLocation.get().setLabel(newLocation.getLabel());
        oldLocation.get().setLongitude(newLocation.getLongitude());
        oldLocation.get().setLongitude(newLocation.getLatitude());

        return locationRepository.save(oldLocation.get());
    }

    @Override
    public Location deleteLocationById(Long id)
    {
        Optional<Location> Location = this.getLocationById(id);
        this.locationRepository.delete(Location.get());
        return Location.get();
    }
}
