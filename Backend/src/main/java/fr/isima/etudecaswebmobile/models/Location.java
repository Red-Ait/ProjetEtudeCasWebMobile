package fr.isima.etudecaswebmobile.models;


import lombok.*;

import javax.persistence.*;

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
    private double longitude;
    private double latitude;

    public Location(Long id_location, String label, double longitude, double latitude) {
        this.id_location = id_location;
        this.label = label;
        this.longitude = longitude;
        this.latitude = latitude;
    }

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
}
