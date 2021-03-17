package fr.isima.etudecaswebmobile.entities.location;

import fr.isima.etudecaswebmobile.entities.mapper.Mapper;
import fr.isima.etudecaswebmobile.models.Location;
import org.springframework.stereotype.Component;

@Component
public class LocationMapper implements Mapper<Location, LocationEntity> {
    @Override
    public Location toModel(LocationEntity entity) {
        return new Location(
                entity.getId_location(),
                entity.getLabel(),
                entity.getLongitude(),
                entity.getLatitude()
        );
    }

    @Override
    public LocationEntity fromModel(Location model) {

        return new LocationEntity(
                model.getId_location(),
                model.getLabel(),
                model.getLongitude(),
                model.getLatitude()
        );
    }
}
