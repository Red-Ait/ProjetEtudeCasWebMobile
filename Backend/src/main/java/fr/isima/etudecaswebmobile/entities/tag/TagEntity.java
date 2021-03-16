package fr.isima.etudecaswebmobile.entities.tag;


import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.isima.etudecaswebmobile.entities.location.LocationEntity;
import fr.isima.etudecaswebmobile.entities.user.UserDao;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Generated
@Data
@NoArgsConstructor
@Entity
@Table(name = "tag")
public class TagEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_tag;

    private String title;

    private int sequence;

    @ManyToMany(mappedBy = "tagEntities", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<LocationEntity> locationEntities;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserDao userDao;

    public TagEntity(String title)
    {
        this.title = title;
        this.locationEntities = new ArrayList<>();
    }

    public TagEntity(Long id_tag, String title) {
        this.id_tag = id_tag;
        this.title = title;
    }

}
