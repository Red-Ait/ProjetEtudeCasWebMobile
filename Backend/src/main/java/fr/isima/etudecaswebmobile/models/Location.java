package fr.isima.etudecaswebmobile.models;


import javax.persistence.*;


@Entity
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue
    private Long id_location;

    private String label;
    private double longitude;
    private double latitude;
}
