package fr.isima.etudecaswebmobile.entities.user;

import fr.isima.etudecaswebmobile.entities.mapper.Mapper;
import fr.isima.etudecaswebmobile.models.UserDto;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements Mapper<UserDto, UserDao> {

    @Override
    public UserDto toModel(UserDao entity) {
        return new UserDto(
                entity.getUsername(),
                entity.getPassword(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getEmail()
        );
    }

    @Override
    public UserDao fromModel(UserDto model) {
        return new UserDao(
                model.getUsername(),
                model.getPassword(),
                model.getFirstName(),
                model.getLastName(),
                model.getEmail()
        );
    }
}
