package fr.isima.etudecaswebmobile.services.impl;


import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.repositories.TagRepository;
import fr.isima.etudecaswebmobile.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class TagImpl implements TagService {


    @Autowired
    private TagRepository tagRepository;
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
}