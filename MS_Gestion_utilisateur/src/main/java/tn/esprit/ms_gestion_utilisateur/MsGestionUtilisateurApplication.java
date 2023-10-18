package tn.esprit.ms_gestion_utilisateur;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import tn.esprit.ms_gestion_utilisateur.Entity.ERole;
import tn.esprit.ms_gestion_utilisateur.Entity.Role;
import tn.esprit.ms_gestion_utilisateur.Repository.RoleRepository;

@SpringBootApplication
@EnableEurekaClient
public class MsGestionUtilisateurApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsGestionUtilisateurApplication.class, args);
    }



}
