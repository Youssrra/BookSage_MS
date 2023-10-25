package com.example.gempruntes.Iservices;

import com.example.gempruntes.Entity.Emprunte;

import java.util.List;

public interface IEmprunteService {
    List<Emprunte> getAllEmprunte();
Emprunte creeEmprunte(Emprunte emprunte);
Emprunte getById(long id);
Emprunte modifierEmprunte(long id ,Emprunte emprunte);
void supprimmerEmprunte(long id);

}
