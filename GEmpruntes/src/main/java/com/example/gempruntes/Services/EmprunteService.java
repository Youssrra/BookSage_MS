package com.example.gempruntes.Services;

import com.example.gempruntes.Entity.Emprunte;
import com.example.gempruntes.Iservices.IEmprunteService;
import com.example.gempruntes.Repository.EmpruntRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
e.setDate(emprunte.getDate());
e.setDescription(emprunte.getDescription());
empruntRepository.save(e);

        return e;
    }

    @Override
    public void supprimmerEmprunte(long id) {
        empruntRepository.deleteById(id);
    }
}
