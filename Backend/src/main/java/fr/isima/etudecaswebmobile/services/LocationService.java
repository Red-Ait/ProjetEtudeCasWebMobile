package fr.isima.etudecaswebmobile.services;

import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.User;

import java.util.List;
import java.util.Optional;

public interface LocationService {

    public Location addLocation(Location location );
    public List<Location> getAllLocations();
    public Optional<Location> getLocationById(Long id) ;


}
