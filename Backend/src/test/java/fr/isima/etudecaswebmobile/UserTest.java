package fr.isima.etudecaswebmobile;


import fr.isima.etudecaswebmobile.models.User;
import fr.isima.etudecaswebmobile.repositories.UserRepository;
import fr.isima.etudecaswebmobile.services.impl.UserImpl;
import lombok.val;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@RunWith(MockitoJUnitRunner.class)
public class UserTest {


    @InjectMocks
    UserImpl userService;

    @Mock
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;


    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getAllUsers()
    {
        List<User> list = new ArrayList<User>();
        User userOne = new User();
        userOne.setId_user((long)1);
        userOne.setFirstName("mohamed");
        userOne.setLastName("lidouh");
        userOne.setEmail("lidouh@gmail.com");
        userOne.setUsername("lidouhmohamed");
        userOne.setPassword("Password123_");
        User userTwo = new User();
        userTwo.setId_user((long)2);
        userTwo.setFirstName("ilyass");
        userTwo.setLastName("aitelkouch");
        userOne.setEmail("aitelkouch@gmail.com");
        userOne.setUsername("aitelkouchilyass");
        userOne.setPassword("Password123_");
        list.add(userOne);
        list.add(userTwo);

        when(userRepository.findAll()).thenReturn(list);

        //test
        List<User> userList = userService.getAllUsers();

        assertEquals(2, userList.size());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    public void getUserByIdTest()
    {
        when(userRepository.findById((long)1)).thenReturn(Optional.of(new User((long) 1, "mohamed", "lidouh","lidouh@gmail.com","lidouhmohamed","Password123_")));

        Optional<User> user = userService.getUserById((long)1);

        assertEquals("mohamed", user.get().getFirstName());
        assertEquals("lidouh", user.get().getLastName());
        assertEquals("lidouh@gmail.com", user.get().getEmail());
        assertEquals("lidouhmohamed", user.get().getUsername());
        assertEquals("Password123_", user.get().getPassword());

    }

    @Test
    public void createUserTest()
    {


        User user = new User();
        user.setFirstName("redouane");
        user.setUsername("redouane");
        userService.addUser(user);

        verify(userRepository, times(1)).save(user);
    }

}





