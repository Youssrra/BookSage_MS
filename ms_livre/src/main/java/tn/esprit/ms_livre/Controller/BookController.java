package tn.esprit.ms_livre.Controller;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.ms_livre.Entity.Book;
import tn.esprit.ms_livre.Repository.BookRepository;
import tn.esprit.ms_livre.Services.BookService;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private BookRepository bookRepository ;


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
    public ResponseEntity<List<Book>> getAuthorsBook(@PathVariable Long id)
    {
        return ResponseEntity.ok(bookService.getAllAuthorsBook(id));

    }

    @GetMapping("/generatepdf")
    public ResponseEntity<byte[]> generatePdfFromBooks() {
            List<Book> books = bookRepository.findAll();

            PDDocument document = new PDDocument();

            try {
                for (Book book : books) {
                    PDPage page = new PDPage();
                    document.addPage(page);

                    try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                        contentStream.setFont(PDType1Font.HELVETICA_BOLD, 16);

                        float x = 50;
                        float y = page.getMediaBox().getHeight() - 50;
                        float rowHeight = 20;

                        // Add the title
                        contentStream.beginText();
                        contentStream.newLineAtOffset(x, y);
                        contentStream.showText("Book Information");
                        contentStream.endText();
                        y -= 2 * rowHeight;

                        // Draw book information
                        drawBookInformation(contentStream, book, x, y, rowHeight);
                    }
                }

                ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream();
                document.save(pdfOutputStream);
                document.close();

                byte[] pdfBytes = pdfOutputStream.toByteArray();

                HttpHeaders headers = new HttpHeaders();
                headers.add("Content-Disposition", "attachment; filename=BookList.pdf");

                return ResponseEntity.ok().headers(headers).body(pdfBytes);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).build();
            }
        }

        private void drawBookInformation(PDPageContentStream contentStream, Book book, float x, float y, float rowHeight) throws IOException {
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);

            contentStream.beginText();

            contentStream.newLineAtOffset(x, y);
            contentStream.showText("Title: " + book.getTitle());
            y -= rowHeight;

            contentStream.newLineAtOffset(0, -rowHeight);
            contentStream.showText("Author: " + book.getAuthor());
            y -= rowHeight;

            contentStream.newLineAtOffset(0, -rowHeight);
            contentStream.showText("ISBN: " + book.getIsbn());
            y -= rowHeight;

            contentStream.newLineAtOffset(0, -rowHeight);
            contentStream.showText("Price: $" + book.getPrice());
            y -= rowHeight;

            contentStream.endText();
        }

}
