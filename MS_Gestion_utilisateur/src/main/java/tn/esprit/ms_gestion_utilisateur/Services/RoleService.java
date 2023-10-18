package tn.esprit.ms_gestion_utilisateur.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.ms_gestion_utilisateur.Entity.ERole;
import tn.esprit.ms_gestion_utilisateur.Entity.Role;
import tn.esprit.ms_gestion_utilisateur.Repository.RoleRepository;

@Service
public class RoleService {

    @Autowired
    RoleRepository roleRepository;

    public void addRole(String role){
        Role r = new Role();
        r.setName(ERole.valueOf(role));
        roleRepository.save(r);
    }

}
