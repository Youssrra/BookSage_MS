package tn.esprit.ms_auteur.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.ms_auteur.entities.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
}
