package fr.isima.etudecaswebmobile.repositories;

import fr.isima.etudecaswebmobile.models.ERole;
import fr.isima.etudecaswebmobile.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
