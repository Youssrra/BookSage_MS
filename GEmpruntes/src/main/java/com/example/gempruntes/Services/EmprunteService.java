package com.example.gempruntes.Services;

import com.example.gempruntes.Entity.Emprunte;
import com.example.gempruntes.Iservices.IEmprunteService;
import com.example.gempruntes.Repository.EmpruntRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class EmprunteService implements IEmprunteService {
    @Autowired
EmpruntRepository empruntRepository;

    @Override
    public List<Emprunte> getAllEmprunte() {
        return empruntRepository.findAll();
    }

    @Override
    public Emprunte creeEmprunte(Emprunte emprunte) {
        emprunte.setDate(new Date());
        empruntRepository.save(emprunte);
        return emprunte;
    }

    @Override
    public Emprunte getById(long id) {
        return empruntRepository.findById(id).get();

    }

    @Override
    public Emprunte modifierEmprunte(long id, Emprunte emprunte) {
        Emprunte e = empruntRepository.findById(id).get();
        e.setDate(new Date());
        e.setDescription(emprunte.getDescription());
        e.setIdUser(emprunte.getIdUser());
        e.setIdLivre(emprunte.getIdLivre());
        e.setRendue(emprunte.getRendue());
        empruntRepository.save(e);
        return e;
    }

    @Override
    public void supprimmerEmprunte(long id) {
        empruntRepository.deleteById(id);
    }
}
