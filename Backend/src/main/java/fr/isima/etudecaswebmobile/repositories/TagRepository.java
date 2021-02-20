package fr.isima.etudecaswebmobile.repositories;

import fr.isima.etudecaswebmobile.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long>
{
}