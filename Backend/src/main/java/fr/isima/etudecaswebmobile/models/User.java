package fr.isima.etudecaswebmobile.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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


    public User(long id_user, String firstName, String lastName) {
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



}
