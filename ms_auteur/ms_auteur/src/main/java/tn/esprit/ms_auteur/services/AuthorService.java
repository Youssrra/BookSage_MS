package tn.esprit.ms_auteur.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.ms_auteur.entities.Author;
import tn.esprit.ms_auteur.repositories.AuthorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    public Author updateAuthor(Long id, Author authorDetails) {
        Optional<Author> authorOptional = authorRepository.findById(id);

        if (authorOptional.isPresent()) {
            Author author = authorOptional.get();
            author.setName(authorDetails.getName());
            author.setBiography(authorDetails.getBiography());
            return authorRepository.save(author);
        }
        // You can handle or throw an exception if the author is not found
        return null;
    }

    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    public Author getAuthorById(Long id) {
        return authorRepository.findById(id).orElse(null); // You can handle or throw an exception if the author is not found
    }

    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }
}
