package tn.esprit.ms_livre.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.ms_livre.Entity.Book;
import tn.esprit.ms_livre.Entity.Category;
import tn.esprit.ms_livre.Repository.BookRepository;
import tn.esprit.ms_livre.Repository.CategoryRepository;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    CategoryRepository categoryRepository ;


    public Book addBook(Book book,Long categorId) {
        Category category = categoryRepository.findById(categorId).get();
        book.setCategory(category);
        return bookRepository.save(book);

    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public void updateBookById(Book book) {
        bookRepository.save(book);
    }

    public void deleteBookById(Long isbn) {
        bookRepository.deleteById(isbn);

    }

    public Book getById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }


    public Integer CountBooksByCategory(Long idCategory)
    {
        return bookRepository.countAllByCategory_Id(idCategory) ;
    }


}
