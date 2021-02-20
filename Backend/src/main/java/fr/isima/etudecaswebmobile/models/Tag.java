package fr.isima.etudecaswebmobile.models;


import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    public Tag(Long id_tag, String title) {
        this.id_tag = id_tag;
        this.title = title;
    }
}