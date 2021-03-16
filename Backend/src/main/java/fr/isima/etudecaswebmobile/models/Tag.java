package fr.isima.etudecaswebmobile.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Generated
@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "tag")
public class Tag {

    @Id
    @GeneratedValue
    private Long id_tag;

    private String title;

    private int sequence;

    @ManyToMany(mappedBy = "tags", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Location> locations;

    public Tag(String title)
    {
        this.title = title;
        this.locations = new ArrayList<>();
    }

    public Tag(Tag tag)
    {
        this.title = tag.title;
        this.locations = new ArrayList<>();
    }

    public Long getId_tag() {
        return id_tag;
    }

    public void setId_tag(Long id_tag) {
        this.id_tag = id_tag;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }


}