package fr.isima.etudecaswebmobile.controllers;

import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TagController {

    @Autowired
    private TagService tagService;

    @RequestMapping(value = "/tag", method = RequestMethod.POST)
    public ResponseEntity<Tag> addTag(@Validated @RequestBody Tag tag) {
        return new ResponseEntity<Tag>(this.tagService.addTag(tag), HttpStatus.OK);
    }

    @RequestMapping(value = "/tags", method = RequestMethod.GET)
    public List<Tag> getAll() {
        return this.tagService.getAllTags();
    }


    @RequestMapping(value = "/tag/{id}", method = RequestMethod.GET)
    public Optional<Tag> getTagById(@PathVariable long id) {
        return this.tagService.getTagById(id);
    }

    @RequestMapping(value = "/tag/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Tag> updateTagById(@Validated @RequestBody Tag tag, @PathVariable long id)
    {
        return new ResponseEntity<Tag>(this.tagService.updateTagById(tag, id), HttpStatus.OK);
    }

    @RequestMapping(value = "/tag/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Tag> deleteTagById(@PathVariable long id)
    {
        return new ResponseEntity<Tag>(this.tagService.deleteTagById(id), HttpStatus.OK);
    }
}