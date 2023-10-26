package tn.esprit.ms_livre.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.ms_livre.Entity.Book;
import tn.esprit.ms_livre.Services.BookService;

import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("/add/{categoriId}")
    public ResponseEntity<?> addBook(@RequestBody Book book,@PathVariable Long categoriId) {
        Book bookk = bookService.addBook(book,categoriId);
        return ResponseEntity.ok(bookk);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateBook(@RequestBody Book book) {
        bookService.updateBookById(book);
        return ResponseEntity.ok("Book updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        bookService.deleteBookById(id);
        return ResponseEntity.ok("Book deleted successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getById(id);
        if (book != null) {
            return ResponseEntity.ok(book);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/coutBooksCategory/{id}")
    public ResponseEntity<Integer> CountBooksByCategory(@PathVariable Long id)
    {
        return ResponseEntity.ok(bookService.CountBooksByCategory(id));

    }

    @GetMapping("/authors/{id}")
    public List<Book> findAllAuthorBooks(@PathVariable("id") Long id){
        return bookService.findAllAuthorBooks(id);
    }

}
