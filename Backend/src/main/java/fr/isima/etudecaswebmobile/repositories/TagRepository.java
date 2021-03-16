package fr.isima.etudecaswebmobile.repositories;

import fr.isima.etudecaswebmobile.entities.tag.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<TagEntity, Long>
{
}
