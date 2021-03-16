package fr.isima.etudecaswebmobile.services.impl;

import fr.isima.etudecaswebmobile.entities.location.LocationEntity;
import fr.isima.etudecaswebmobile.entities.location.LocationMapper;
import fr.isima.etudecaswebmobile.entities.tag.TagEntity;
import fr.isima.etudecaswebmobile.exception.NoContentException;
import fr.isima.etudecaswebmobile.exception.NotFoundException;
import fr.isima.etudecaswebmobile.exception.UnauthorizedException;
import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.repositories.LocationRepository;
import fr.isima.etudecaswebmobile.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
public class LocationImpl implements LocationService {


    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private LocationMapper locationMapper;

    @Override
    public Location addLocation(Location location, String tag_title) {
        if(location.getId_location()== null) {
            TagEntity tag = new TagEntity(tag_title);
            LocationEntity locationEntity = locationMapper.fromModel(location);

            List<TagEntity> tagEntities = locationEntity.getTagEntities();
            tagEntities.add(tag);
            locationEntity.setTagEntities(tagEntities);

            return locationMapper.toModel(locationRepository.save(locationEntity));
        }else
            throw new UnauthorizedException("Location exist");
    }

    @Override
    public List<Location> getAllLocations() {
        List<LocationEntity> locationEntities = locationRepository.findAll();
        if (!locationEntities.isEmpty())
            return locationEntities.stream()
                    .map(locationMapper::toModel)
                    .collect(Collectors.toList());
        else
            throw new NoContentException("Locations Not Found");
    }

    @Override
    public Location getLocationById(Long id) {
        Optional<LocationEntity> locationEntity = locationRepository.findById(id);
        if (locationEntity.isPresent())
            return locationMapper.toModel(locationEntity.get());
        else
            throw new NotFoundException("The location selected not Found");
    }

    @Override
    public Location updateLocationById(Location newLocation, Long id)
    {
        Optional<LocationEntity> optionalLocationEntity = locationRepository.findById(id);
        if (optionalLocationEntity.isPresent()) {
            LocationEntity oldLocationEntity = optionalLocationEntity.get();

            oldLocationEntity.setLabel(newLocation.getLabel());
            oldLocationEntity.setLongitude(newLocation.getLongitude());
            oldLocationEntity.setLongitude(newLocation.getLatitude());

            return locationMapper.toModel(locationRepository.save(oldLocationEntity));
        }else
            throw new NotFoundException("location not found");
    }

    @Override
    public void deleteLocationById(Long id) {

        Optional<LocationEntity> locationEntityOptional = locationRepository.findById(id);
        if (locationEntityOptional.isPresent()) {
            LocationEntity locationEntity = locationEntityOptional.get();
            List<TagEntity> tagEntities = locationEntity.getTagEntities();
            if (tagEntities != null) {
                tagEntities.forEach(tagEntity -> {
                    List<LocationEntity> locationEntities = tagEntity.getLocationEntities();
                    locationEntities.remove(locationEntity);
                    tagEntity.setLocationEntities(locationEntities);
                });
                locationEntity.setTagEntities(null);
            }
            locationRepository.deleteById(id);
        } else
            throw new NotFoundException("Location Not Found");
    }

    @Override
    public List<Location> getLocationsByTag(@PathVariable long tag_id)
    {
        return locationRepository.getLocationsByTag(tag_id)
                .orElseThrow(() -> new NoContentException("Locations Not Found"))
                .stream()
                .map(locationMapper::toModel).collect(Collectors.toList());
    }

    @Override
    public List<Location> findAllLocationsByUserId(Long id) {

        return locationRepository.findAllLocationsByUserId(id)
                .orElseThrow(() -> new NoContentException("There are no Location for this user"))
                .stream()
                .map(locationMapper::toModel)
                .collect(Collectors.toList());
    }
}
