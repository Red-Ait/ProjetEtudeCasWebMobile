package fr.isima.etudecaswebmobile.repositories;

import fr.isima.etudecaswebmobile.entities.tag.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<TagEntity, Long>
{
    Optional<TagEntity> findByTitleAndUserDaoUsername(String title, String userName);
}
