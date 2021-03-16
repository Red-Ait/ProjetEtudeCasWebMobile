package fr.isima.etudecaswebmobile.services;

import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.UserDao;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface LocationService {

    public Location addLocation(Location location, String tag_title) throws Exception;
    public List<Location> getAllLocations();
    public Optional<Location> getLocationById(Long id) ;
    public Location updateLocationById(Location location, Long id) ;
    public Location deleteLocationById(Long id) ;
    public List<Location> getLocationsByTag(@PathVariable long tag_id);
}
