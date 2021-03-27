package fr.isima.etudecaswebmobile.entities.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

@Entity
@Table(
        name = "user",
        uniqueConstraints={@UniqueConstraint(columnNames = {"username"})}
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NonNull
    @Column
    private String firstName;
    @NonNull
    @Column
    private String lastName;
    @NonNull
    @Column
    private String email;
    @NonNull
    @Column
    private String username;
    @NonNull
    @Column
    @JsonIgnore
    private String password;

    public UserDao(
            String firstName,
            String lastName,
            String email,
            String username,
            String password
    ) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

}

