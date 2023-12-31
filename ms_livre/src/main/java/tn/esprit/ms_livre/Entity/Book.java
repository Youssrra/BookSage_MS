package tn.esprit.ms_livre.Entity;

import javax.persistence.*;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    @Column(name = "isbn", updatable = false)
    private long isbn;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "author", nullable = false)
    private Long author;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "avaibility", nullable = false)
    private Boolean avaibility ;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public Boolean getAvaibility() {
        return avaibility;
    }

    public void setAvaibility(Boolean avaibility) {
        this.avaibility = avaibility;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Book() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getIsbn() {
        return isbn;
    }

    public void setIsbn(long isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getAuthor() {
        return author;
    }

    public void setAuthor(Long author) {
        this.author = author;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
