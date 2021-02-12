package fr.isima.etudecaswebmobile.services.impl;

import fr.isima.etudecaswebmobile.models.Role;
import fr.isima.etudecaswebmobile.models.User;
import fr.isima.etudecaswebmobile.repositories.UserRepository;
import fr.isima.etudecaswebmobile.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
@Transactional
public class UserImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public User addUser(User user) {
        if(user.getPassword()!=null){
            user.setPassword(encoder.encode(user.getPassword()));
        }

        Set<String> strRoles = new HashSet<>();
        strRoles.add("user");
        Set<Role> roles = new HashSet<>();
        user.setRoles(roles);
        return userRepository.save(user);

    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);

    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = this.userRepository.findAll();
        if (users.isEmpty())
            return Collections.emptyList();
        else
            return users;
    }

    @Override
    public void deleteUser(Long id) {
        Optional<User> user = this.userRepository.findById(id);
        this.userRepository.delete(user.get());

    }



}
