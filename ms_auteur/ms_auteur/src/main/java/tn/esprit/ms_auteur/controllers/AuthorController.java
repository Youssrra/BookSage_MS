package tn.esprit.ms_auteur.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.ms_auteur.entities.Author;
import tn.esprit.ms_auteur.services.AuthorService;

import java.util.List;

@RestController
@RequestMapping("/authors")
@CrossOrigin(origins = "*")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @PostMapping("/add")
    public Author createAuthor(@RequestBody Author author) {
        return authorService.createAuthor(author);
    }

    @GetMapping("/getall")
    public List<Author> getAllAuthors() {
        return authorService.getAllAuthors();
    }

    @GetMapping("/getById/{id}")
    public Author getAutorById(@PathVariable("id") Long id) {
        return authorService.getAuthorById(id);
    }

    @PutMapping("/update/{id}")
    public Author updateAuthor(@PathVariable("id") Long id,@RequestBody Author author) {
        return authorService.updateAuthor(id,author);
    }

    @DeleteMapping("/delete/{id}")
    public void updateAuthor(@PathVariable("id") Long id) {
        authorService.deleteAuthor(id);
    }








}
