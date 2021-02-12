package fr.isima.etudecaswebmobile.models;


import javax.persistence.*;

@Entity
@Table(name = "tag")
public class Tag {

    @Id
    @GeneratedValue
    private Long id_tag;

    private String title;

}
