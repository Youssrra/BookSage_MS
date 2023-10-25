package com.example.gempruntes.Controller;

import com.example.gempruntes.Entity.Emprunte;
import com.example.gempruntes.Services.EmprunteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Empruntes")
public class EmprunteRestController {
    @Autowired
    EmprunteService emprunteService;
@GetMapping("/getEmprunte")
    public List<Emprunte> getAllEmprunte(){return emprunteService.getAllEmprunte() ; }

    @PostMapping("/creeEmprunte")
    public  Emprunte creeEmprunte(@RequestBody Emprunte emprunte){return emprunteService.creeEmprunte(emprunte);}
    @GetMapping("/trouverEmprunte/{id}")
    public  Emprunte trouveEmprunte(@RequestParam long id){return emprunteService.getById(id);}
    @PutMapping("modifierEmprunte/{id}")
    public Emprunte ModifierEprunte(@PathVariable("id") long id ,@RequestBody Emprunte emprunte){

           return emprunteService.modifierEmprunte(id,emprunte);

    }
@DeleteMapping("/supprimer/{id}")
    public void supprimer(@PathVariable("id") long id){emprunteService.supprimmerEmprunte(id);}





}
