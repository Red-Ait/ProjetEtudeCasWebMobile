package fr.isima.etudecaswebmobile.repositories;

import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.Tag;
import fr.isima.etudecaswebmobile.models.UserDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long>
{
}