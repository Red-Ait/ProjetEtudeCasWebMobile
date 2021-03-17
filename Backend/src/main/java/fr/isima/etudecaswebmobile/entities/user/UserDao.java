package fr.isima.etudecaswebmobile.entities.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "user")
public class UserDao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String username;
    @Column
    @JsonIgnore
    private String password;

    @Column
    private String firstname;

    @Column
    private String lastname;

    @Column
    private String email;

    public UserDao(
            String username,
            String password,
            String firstName,
            String lastName,
            String email
    ) {
        this.username = username;
        this.password = password;
        this.firstname = firstName;
        this.lastname = lastName;
        this.email = email;
    }

}

