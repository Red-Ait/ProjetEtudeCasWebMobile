package fr.isima.etudecaswebmobile.models;


import org.springframework.util.Assert;

import javax.persistence.*;
import java.util.Objects;
import java.util.regex.Pattern;

@Entity
@Table(name = "tag")
public class Tag {

    @Id
    @GeneratedValue
    private Long id_tag;

    private String title;

    public Tag(String title) {
        Assert.hasText(title, "title cannot be null, empty or blank");
        Assert.isTrue(Pattern.matches("[a-zA-Z][a-zA-Z0-9_-]*", title), "title must start with a letter and contain only letters, digits, - or _");

        this.title = title;
    }

    public String getTitle(){
        return title;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Tag other = (Tag) obj;
        return Objects.equals(title, other.title);
    }

}
