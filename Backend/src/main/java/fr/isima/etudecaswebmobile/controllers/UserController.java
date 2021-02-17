package fr.isima.etudecaswebmobile.controllers;


import fr.isima.etudecaswebmobile.models.User;
import fr.isima.etudecaswebmobile.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping(path = "/user")
    public List<User> getAll() {
        return this.userService.getAllUsers();
    }

    @PostMapping(path = "/user")
    public ResponseEntity<User> addUser(@Validated @RequestBody User user) {
        return new ResponseEntity<User>(this.userService.addUser(user), HttpStatus.OK);
    }


    @GetMapping(path= "/user/{id}")
    public Optional<User> getUserById(@PathVariable long id) {

        return this.userService.getUserById(id);

    }



    @PutMapping(path = "/user")
    public ResponseEntity<User> updateUser(@Validated @RequestBody User user) {
        return new ResponseEntity<User>(this.userService.addUser(user), HttpStatus.OK);
    }


    @DeleteMapping(path= "/user/{id}")
    public String deleteUserById(@PathVariable long id) {

        this.userService.deleteUser(id);
        return "user deleted!";

    }

}
