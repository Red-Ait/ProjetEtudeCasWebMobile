package fr.isima.etudecaswebmobile.controllers;

import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TagController {

    @Autowired
    private TagService tagService;

    @PostMapping("/tag")
    public ResponseEntity<Tag> addTag(@Validated @RequestBody Tag tag) {
        return new ResponseEntity<>(this.tagService.addTag(tag), HttpStatus.CREATED);
    }

    @GetMapping("/tag")
    public ResponseEntity<List<Tag>> getAll() {
        return new ResponseEntity<>(this.tagService.getAllTags(), HttpStatus.OK);
    }

    @GetMapping("/tag/{id}")
    public ResponseEntity<Tag> getTagById(@PathVariable long id) {
        return new ResponseEntity<>(this.tagService.getTagById(id), HttpStatus.OK);
    }

    @PutMapping("/tag/{id}")
    public ResponseEntity<Tag> updateTagById(@Validated @RequestBody Tag newTag, @PathVariable long id)
    {
        return new ResponseEntity<>(this.tagService.updateTagById(newTag, id),HttpStatus.CREATED);
    }

    @DeleteMapping("/tag/{id}")
    public ResponseEntity<Boolean> deleteTagById(@PathVariable long id)
    {
        return tagService.deleteTagById(id);
    }

    @PostMapping("/tag/location/{location_id}")
    public ResponseEntity<Tag> addTagToLocation(@PathVariable long location_id, @Validated @RequestBody Tag tag)
    {
        return new ResponseEntity<>(this.tagService.addTagToLocation(location_id, tag), HttpStatus.OK);
    }

    @PutMapping("/tag/{tag_id}/location/{location_id}")
    public ResponseEntity<Tag> addExistedTagToLocation(@PathVariable long location_id, @PathVariable long tag_id)
    {
        return new ResponseEntity<>(this.tagService.addExistedTagToLocation(location_id, tag_id), HttpStatus.OK);
    }

}
