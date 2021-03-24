package fr.isima.etudecaswebmobile.services.location;



import fr.isima.etudecaswebmobile.services.impl.LocationImpl;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;


@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles({"test"})
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@TestPropertySource(properties = {"spring.config.location=classpath:application.properties"})
public class LocationIT {

    @Autowired
    LocationImpl locationImpl;

    @Test
    @Transactional
    public void when_findAll_expect_facilities() {
        Assertions.assertTrue(locationImpl.getAllLocations().size() > 0);
    }

}
