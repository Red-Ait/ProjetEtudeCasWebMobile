package fr.isima.etudecaswebmobile.services.impl;

import fr.isima.etudecaswebmobile.entities.location.LocationEntity;
import fr.isima.etudecaswebmobile.entities.location.LocationMapper;
import fr.isima.etudecaswebmobile.entities.tag.TagEntity;
import fr.isima.etudecaswebmobile.entities.user.UserDao;
import fr.isima.etudecaswebmobile.exception.NoContentException;
import fr.isima.etudecaswebmobile.exception.NotFoundException;
import fr.isima.etudecaswebmobile.exception.UnauthorizedException;
import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.repositories.LocationRepository;
import fr.isima.etudecaswebmobile.repositories.TagRepository;
import fr.isima.etudecaswebmobile.repositories.UserRepository;
import fr.isima.etudecaswebmobile.services.JwtUserDetailsService;
import fr.isima.etudecaswebmobile.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.*;
import java.util.stream.Collectors;


@Service
@Transactional
public class LocationImpl implements LocationService {


    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private LocationMapper locationMapper;
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Location addLocation(Location location, String tag_title) {
        if(location.getId_location()== null) {
            TagEntity tag = new TagEntity(tag_title);

            LocationEntity locationEntity = locationMapper.fromModel(location);
            locationEntity.setTagEntities(new ArrayList<>(Arrays.asList(tag)));

            tagRepository.save(tag);
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

    @Override
    public List<Location> findAllLocationsOfAnotherUserByTagTitles(String ownerUsername, List<String> tagTitles) {
        //remove duplicates
        Set<String> set = new HashSet<>(tagTitles);
        tagTitles.clear();
        tagTitles.addAll(set);

        if (!tagTitles.isEmpty()) {
            tagTitles.stream().map(title -> tagRepository.findByTitleAndUserDaoUsername(title, ownerUsername))
                    .forEach(tagEntityOptional -> {
                        if (tagEntityOptional.isPresent()) {
                            if (
                                    !tagEntityOptional.get().getAccessUserEntities()
                                            .stream().map(UserDao::getId).collect(Collectors.toList())
                                            .contains(userDetailsService.getCurrentUser().getId())
                            )
                                throw new UnauthorizedException("This user does not have access to one or all the selected tags");
                        } else
                            throw new NotFoundException("One or all the tags do not exist");
                    });

            List<LocationEntity> locationEntities = locationRepository.findAllLocationsByTagTitles(tagTitles);
            if (!locationEntities.isEmpty())
                return locationEntities.stream()
                    .map(locationMapper::toModel)
                    .collect(Collectors.toList());
            else
                throw new NoContentException("There are no Locations");
        } else
            throw new UnauthorizedException("There are no selected tags");
    }

    @Override
    public String shareLocationsWithAnotherUserByTagTitles(String otherUsername, List<String> tagTitles) {
        UserDao otherUser = userRepository.findByUsername(otherUsername);
        if (otherUser == null)
            throw new NotFoundException("The user does not exist");

        //remove duplicates
        Set<String> set = new HashSet<>(tagTitles);
        tagTitles.clear();
        tagTitles.addAll(set);

        if (!tagTitles.isEmpty()) {
            List<TagEntity> tagEntities = new ArrayList<>();
            tagTitles.stream().map(title -> tagRepository.findByTitleAndUserDaoUsername(
                    title,
                    userDetailsService.getCurrentUser().getUsername()
            )).forEach(tagEntityOptional -> {
                if (tagEntityOptional.isPresent())
                    tagEntities.add(tagEntityOptional.get());
                else
                    throw new NotFoundException("One or all the tags do not exist");
            });


            tagEntities
                    .forEach(tagEntity -> {
                        List<UserDao> accessUserEntities = tagEntity.getAccessUserEntities();
                        if (accessUserEntities.isEmpty())
                            accessUserEntities = new ArrayList<>();
                        if (!accessUserEntities.contains(otherUser))
                            accessUserEntities.add(otherUser);
                        tagEntity.setAccessUserEntities(accessUserEntities);
                    });
            tagRepository.saveAll(tagEntities);

            final String baseUrl =
                    ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
            String link = baseUrl+"/api/location/owner_user/"+userDetailsService.getCurrentUser().getUsername()+"/tags/";
            for (int i = 0; i < tagTitles.size(); i++) {
                link = link + tagTitles.get(i) + ",";
            }
            link = link.substring(0, link.length() - 1);

            return link;
        } else
            throw new UnauthorizedException("There are no selected tags");
    }

}
