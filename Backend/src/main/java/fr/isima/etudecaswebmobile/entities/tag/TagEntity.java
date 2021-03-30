package fr.isima.etudecaswebmobile.entities.tag;


import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.isima.etudecaswebmobile.entities.location.LocationEntity;
import fr.isima.etudecaswebmobile.entities.user.UserDao;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.util.Assert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;

@Generated
@Data
@NoArgsConstructor
@Entity
@Table(
        name = "tag",
        uniqueConstraints={@UniqueConstraint(columnNames = {"title", "user_id"})}
)
public class TagEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_tag;

    private String title;

    private int sequence;

    @ToString.Exclude
    @ManyToMany(mappedBy = "tagEntities")
    @JsonIgnore
    private List<LocationEntity> locationEntities;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserDao userDao;

    @ManyToMany
    @JoinTable(inverseJoinColumns=@JoinColumn(name="access_user_id"))
    private List<UserDao> accessUserEntities;

    public TagEntity(String title) {
        Assert.hasText(title, "title cannot be null, empty or blank");
        Assert.isTrue(Pattern.matches("[ a-zA-Z][ a-zA-Z0-9_-]*", title), "title must start with a letter and contain only letters, digits, - or _");

        this.title = title;
        this.locationEntities = new ArrayList<>();
        this.accessUserEntities = new ArrayList<>();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        TagEntity other = (TagEntity) obj;
        return Objects.equals(title, other.title);
    }

    public TagEntity(Long id_tag, String title) {
        this.id_tag = id_tag;
        this.title = title;
        this.locationEntities = new ArrayList<>();
        this.accessUserEntities = new ArrayList<>();
    }

}
