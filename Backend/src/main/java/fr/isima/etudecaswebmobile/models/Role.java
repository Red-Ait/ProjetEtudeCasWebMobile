package fr.isima.etudecaswebmobile.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue
    private Long id_role;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private  ERole name;

}