package fr.isima.etudecaswebmobile.services.impl;

import fr.isima.etudecaswebmobile.controllers.JwtAuthenticationController;
import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.models.UserDao;
import fr.isima.etudecaswebmobile.repositories.LocationRepository;
import fr.isima.etudecaswebmobile.repositories.UserRepository;
import fr.isima.etudecaswebmobile.services.JwtUserDetailsService;
import fr.isima.etudecaswebmobile.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;


@Service
@Transactional
public class LocationImpl implements LocationService {


    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private JwtUserDetailsService userDetailsService;


    @Override
    public Location addLocation(Location location, String tag_title)
    {
        Location newlocation = new Location(location);
        Tag tag = new Tag(tag_title);
        //tag.getLocations().add(newlocation);
        newlocation.setUserDao(userDetailsService.getCurrentUser());
        newlocation.getTags().add(tag);
        return locationRepository.save(newlocation);
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

    @Override
    public List<Location> getLocationsByTag(@PathVariable long tag_id)
    {
        return this.locationRepository.getLocationsByTag(tag_id);
    }
}
