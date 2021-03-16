package fr.isima.etudecaswebmobile.repositories;


import fr.isima.etudecaswebmobile.models.UserDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserDao, Integer> {

    @Query("select u from UserDao u where u.username= :username")
    UserDao findByUsername(@Param("username") String username);
    UserDao findById(Long id);
}