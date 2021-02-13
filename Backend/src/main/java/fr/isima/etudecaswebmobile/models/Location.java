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
    @GeneratedValue
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
}
