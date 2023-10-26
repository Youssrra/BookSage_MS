package tn.esprit.ms_auteur.entities;

import javax.persistence.*;

@Entity
public class Author  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // New Biography field
    @Column(length = 2000) // or type TEXT if you expect very long texts
    private String biography;

    // Getters and setters


    public Author() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }
}
