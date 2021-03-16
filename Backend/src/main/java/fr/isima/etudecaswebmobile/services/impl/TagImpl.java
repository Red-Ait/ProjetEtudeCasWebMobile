package fr.isima.etudecaswebmobile.services.impl;


import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.repositories.TagRepository;
import fr.isima.etudecaswebmobile.services.JwtUserDetailsService;
import fr.isima.etudecaswebmobile.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class TagImpl implements TagService {


    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private LocationImpl locationService;

    @Override
    public Tag addTag(Tag tag) {
        return tagRepository.save(tag);
    }

    @Override
    public List<Tag> getAllTags() {
        List<Tag> tags  = this.tagRepository.findAll();
        if (tags.isEmpty())
            return Collections.emptyList();
        else
            return tags;
    }

    @Override
    public Optional<Tag> getTagById(Long id) {
        return tagRepository.findById(id);
    }

    @Override
    public Tag updateTagById(Tag newTag, Long id) {
        Optional<Tag> oldTag = this.getTagById(id);
        oldTag.get().setTitle(newTag.getTitle());

        return tagRepository.save(oldTag.get());
    }

    @Override
    public Tag deleteTagById(Long id) {
        Optional<Tag> tag = this.getTagById(id);
        this.tagRepository.delete(tag.get());
        return tag.get();
    }

    @Override
    public Tag addTagToLocation(Long location_id, Tag tag)
    {
        Tag newTag = new Tag(tag);
        Optional<Location> locationObject = locationService.getLocationById(location_id);
        Location location = locationObject.get();
        newTag.getLocations().add(location);
        location.getTags().add(newTag);
        locationService.updateLocationById(location, location_id);

        return this.addTag(newTag);
    }

    @Override
    public Tag addExistedTagToLocation(long location_id, long tag_id)
    {
        Tag existedTag = this.getTagById(tag_id).get();
        Optional<Location> locationObject = locationService.getLocationById(location_id);
        Location location = locationObject.get();
        existedTag.getLocations().add(location);
        location.getTags().add(existedTag);
        locationService.updateLocationById(location, location_id);
        return this.addTag(existedTag);
    }
}