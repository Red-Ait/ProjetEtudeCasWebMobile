package fr.isima.etudecaswebmobile.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.util.Assert;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.regex.Pattern;

@Generated
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user")
public class User implements Serializable {

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include()
    private Long id_user;

    private String firstName;
    private String lastName;
    private String email;

    @Column(unique = true)
    @EqualsAndHashCode.Include()
    private String username;
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_role",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "id_role"))
    @JsonIgnore
    private Set<Role> roles = new HashSet<>();


    public User(String firstName) {
        this.id_user=id_user;
        this.firstName=firstName;
        this.lastName=lastName;
    }

    public User(long id_user, String firstName, String lastName,String email,String username, String password) {
        this.id_user=id_user;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.username=username;
        this.password=password;

    }

    public User(String firstName, String lastName,String email,String username, String password) {
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.username=username;
        this.password=password;

        Assert.hasText(firstName, "firstName cannot be null, empty or blank");
        Assert.isTrue(Pattern.matches("[a-zA-Z][a-zA-Z0-9_-]*", firstName), "firstName must start with a letter and contain only letters, digits, - or _");
        Assert.hasText(lastName, "lastName cannot be null, empty or blank");
        Assert.isTrue(Pattern.matches("[a-zA-Z][a-zA-Z0-9_-]*", lastName), "lastName must start with a letter and contain only letters, digits, - or _");
        Assert.hasText(email, "email cannot be null, empty or blank");
        Assert.isTrue(Pattern.matches("[a-zA-Z][a-zA-Z0-9.@_-]*", email), "email must have the structure of example@email.com");
        Assert.hasText(username, "username cannot be null, empty or blank");
        Assert.isTrue(Pattern.matches("[a-zA-Z][a-zA-Z0-9_-]*", username), "username must start with a letter and contain only letters, digits, - or _");

    }
    public String getFirstName(){
        return firstName;
    }
    public String getLastName(){
        return lastName;
    }
    public String getEmail(){
        return email;
    }
    public String getUsername(){
        return username;
    }


    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        User other = (User) obj;
        return Objects.equals(firstName, other.firstName) && Objects.equals(lastName, other.lastName) && Objects.equals(email, other.email) && Objects.equals(username, other.username);
    }




}
