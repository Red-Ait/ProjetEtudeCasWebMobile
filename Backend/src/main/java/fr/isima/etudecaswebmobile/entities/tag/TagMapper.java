package fr.isima.etudecaswebmobile.entities.tag;

import fr.isima.etudecaswebmobile.entities.location.LocationMapper;
import fr.isima.etudecaswebmobile.entities.mapper.Mapper;
import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TagMapper implements Mapper<Tag, TagEntity> {

    @Autowired
    private LocationMapper locationMapper;

    @Override
    public Tag toModel(TagEntity entity) {
        List<Location> locations;
        if (entity.getLocationEntities().isEmpty())
            locations = new ArrayList<>();
        else
            locations = entity.getLocationEntities().stream()
                    .map(locationMapper::toModel)
                    .collect(Collectors.toList());
        return new Tag(
                entity.getId_tag(),
                entity.getTitle(),
                locations
        );
    }

    @Override
    public TagEntity fromModel(Tag model) {
        return new TagEntity(
                model.getId_tag(),
                model.getTitle()
        );
    }
}
