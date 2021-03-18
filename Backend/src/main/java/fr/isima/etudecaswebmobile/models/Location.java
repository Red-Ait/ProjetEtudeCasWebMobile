package fr.isima.etudecaswebmobile.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location {

    private Long id_location;

    private String label;
    private double longitude;
    private double latitude;

}