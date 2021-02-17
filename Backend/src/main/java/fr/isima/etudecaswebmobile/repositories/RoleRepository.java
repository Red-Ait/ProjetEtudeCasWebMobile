package fr.isima.etudecaswebmobile.repositories;

import fr.isima.etudecaswebmobile.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
