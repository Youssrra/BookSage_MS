package tn.esprit.ms_gestion_utilisateur.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.ms_gestion_utilisateur.Entity.ERole;
import tn.esprit.ms_gestion_utilisateur.Entity.Role;
import tn.esprit.ms_gestion_utilisateur.Entity.User;
import tn.esprit.ms_gestion_utilisateur.Repository.RoleRepository;
import tn.esprit.ms_gestion_utilisateur.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User updateUser(Integer userId,User userRequest) {
        User existingUser = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (userRequest.getUsername() != null && !userRequest.getUsername().isEmpty()) {
            existingUser.setUsername(userRequest.getUsername());
        }

        if (userRequest.getPassword() == null || userRequest.getPassword().isEmpty()) {
            userRequest.setPassword(existingUser.getPassword());
        }
        existingUser.setPassword(userRequest.getPassword());

        if (userRequest.getEmail() == null || userRequest.getEmail().isEmpty()) {
            userRequest.setEmail(existingUser.getEmail());
        }
        existingUser.setEmail(userRequest.getEmail());

        if (userRequest.getFirstName() == null || userRequest.getFirstName().isEmpty()) {
            userRequest.setFirstName(existingUser.getFirstName());
        }
        existingUser.setFirstName(userRequest.getFirstName());

        if (userRequest.getLastName() == null || userRequest.getLastName().isEmpty()) {
            userRequest.setLastName(existingUser.getLastName());
        }
        existingUser.setLastName(userRequest.getLastName());

        return userRepository.save(existingUser);
    }


    public String deleteUser(Integer userId) {
        userRepository.deleteById(userId);
        return userId+"User deleted succesully";
    }

    public List<User> findUsersByRoleClient() {
        return userRepository.findUsersByRole(ERole.CLIENT);
    }

    public List<User> findUsersByRoleAdmin() {
        return userRepository.findUsersByRole(ERole.ADMIN);
    }

}

