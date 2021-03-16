package fr.isima.etudecaswebmobile.repositories;

import fr.isima.etudecaswebmobile.entities.location.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface LocationRepository extends JpaRepository<LocationEntity, Long>
{
    @Query("select l from LocationEntity l  join l.tagEntities t where t.id_tag= :tag_id")
    Optional<List<LocationEntity>> getLocationsByTag(@Param("tag_id") long tag_id);

    @Query(value = "SELECT l.id_location, l.label, l.longitude, l.latitude " +
            "from Location l " +
            "INNER JOIN tag_location_entities tl on l.id_location = tl.location_entities_id_location " +
            "INNER JOIN tag t on tl.tag_entities_id_tag = t.id_tag where t.user_id = ?1", nativeQuery = true)
    Optional<List<LocationEntity>> findAllLocationsByUserId(Long id);
}
