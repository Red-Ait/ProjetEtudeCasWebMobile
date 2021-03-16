package fr.isima.etudecaswebmobile.repositories;

import fr.isima.etudecaswebmobile.models.Location;
import fr.isima.etudecaswebmobile.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface LocationRepository extends JpaRepository<Location, Long>
{
    @Query("select l from Location l  join l.tags t where t.id_tag= :tag_id")
    List<Location> getLocationsByTag(@Param("tag_id") long tag_id);
}
