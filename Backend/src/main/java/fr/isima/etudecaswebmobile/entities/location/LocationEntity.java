package fr.isima.etudecaswebmobile.entities.location;


import fr.isima.etudecaswebmobile.entities.tag.TagEntity;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;

@Generated
@Data
@NoArgsConstructor
@Entity
@Table(name = "location")
public class LocationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_location;

    private String label;
    private double longitude;
    private double latitude;

    @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "locations_tags",
            joinColumns = @JoinColumn(name = "location_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<TagEntity> tagEntities;

    public LocationEntity(Long id_location, String label, double longitude, double latitude)
    {
        this.id_location = id_location;
        this.label = label;
        this.longitude = longitude;
        this.latitude = latitude;
        this.tagEntities = Arrays.asList();
    }

}
