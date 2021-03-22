package fr.isima.etudecaswebmobile.entities.location;


import fr.isima.etudecaswebmobile.entities.tag.TagEntity;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.util.Assert;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;

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

    public LocationEntity(String label) {
        Assert.hasText(label, "label cannot be null, empty or blank");
        Assert.isTrue(Pattern.matches("[a-zA-Z][a-zA-Z0-9_-]*", label), "label must start with a letter and contain only letters, digits, - or _");

        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    private double latitude;

    private double longitude;



    public LocationEntity(Double longitude, Double latitude) {
        Assert.notNull(longitude, "longitude cannot be null");
        Assert.notNull(latitude, "latitude cannot be null");

        this.longitude = longitude;
        this.latitude = latitude;

    }

    public double getLongitude(){
        return longitude;
    }

    public double getLatitude(){
        return latitude;
    }


    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "locations_tags",
            joinColumns = @JoinColumn(name = "location_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<TagEntity> tagEntities;

    public LocationEntity(Long id_location, String label, double latitude, double longitude)
    {
        this.id_location = id_location;
        this.label = label;
        this.latitude = latitude;
        this.longitude = longitude;
        this.tagEntities = Arrays.asList();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        LocationEntity other = (LocationEntity) obj;
        return Objects.equals(label, other.label) && Objects.equals(longitude, other.longitude) && Objects.equals(latitude, other.latitude);
    }
}
