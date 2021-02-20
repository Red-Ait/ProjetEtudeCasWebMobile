package fr.isima.etudecaswebmobile.repositories;


import fr.isima.etudecaswebmobile.models.UserDao;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserDao, Integer> {
    UserDao findByUsername(String username);
}