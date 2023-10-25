package com.example.gempruntes.Repository;

import com.example.gempruntes.Entity.Emprunte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpruntRepository extends JpaRepository<Emprunte,Long> {

}
