package fr.isima.etudecaswebmobile.services;

import fr.isima.etudecaswebmobile.models.Location;

import java.util.List;
import java.util.Optional;

public interface LocationService {

    public Location addLocation(Location location );
    public List<Location> getAllLocations();
    public Optional<Location> getLocationById(Long id) ;
    public Location updateLocationById(Location location, Long id) ;
    public Location deleteLocationById(Long id) ;
}
