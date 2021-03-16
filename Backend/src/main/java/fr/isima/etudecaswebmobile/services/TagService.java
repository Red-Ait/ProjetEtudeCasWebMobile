package fr.isima.etudecaswebmobile.services;

import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.Tag;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface TagService {

    public Tag addTag(Tag tag );
    public List<Tag> getAllTags();
    public Optional<Tag> getTagById(Long id) ;
    public Tag updateTagById(Tag tag, Long id) ;
    public Tag deleteTagById(Long id) ;
    public Tag addTagToLocation(Long location_id, Tag tag);
    public Tag addExistedTagToLocation(long location_id, long tag_id);
}