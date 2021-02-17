package fr.isima.etudecaswebmobile.models;


import lombok.*;
import org.springframework.util.Assert;

import javax.persistence.*;
import java.util.Objects;
import java.util.regex.Pattern;

@Generated
@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id_location;

    private String label;

    public Location(String label) {
        Assert.hasText(label, "label cannot be null, empty or blank");
        Assert.isTrue(Pattern.matches("[a-zA-Z][a-zA-Z0-9_-]*", label), "label must start with a letter and contain only letters, digits, - or _");

        this.label = label;
    }

    public String getLabel(){
        return label;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Location other = (Location) obj;
        return Objects.equals(label, other.label);
    }

    private double longitude;
    private double latitude;

    public Location(Long id_location, String label, double longitude, double latitude) {
        this.id_location = id_location;
        this.label = label;
        this.longitude = longitude;
        this.latitude = latitude;
    }

<<<<<<< HEAD
    public Long getId_location() {
        return id_location;
    }

    public void setId_location(Long id_location) {
        this.id_location = id_location;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
=======
>>>>>>> 0130b0d9abf2061c15a7035c547e72f82824af74
}
