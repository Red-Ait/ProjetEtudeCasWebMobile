package fr.isima.etudecaswebmobile.services;

import fr.isima.etudecaswebmobile.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    public User addUser(User user );
    public User updateUser(User user);
    public Optional<User> getUserById(Long id) ;
    public Optional<User> getUserByUsername(String username);
    public List<User> getAllUsers();
    public void deleteUser(Long id);
}
