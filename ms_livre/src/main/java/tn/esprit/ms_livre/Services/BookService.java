package tn.esprit.ms_livre.Services;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.ms_livre.Entity.Book;
import tn.esprit.ms_livre.Entity.Category;
import tn.esprit.ms_livre.Repository.BookRepository;
import tn.esprit.ms_livre.Repository.CategoryRepository;

import java.io.File;
import java.io.IOException;
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



    public void generatePdfFromBooks() throws IOException {
        List<Book> books = bookRepository.findAll();

        String userHomeDir = System.getProperty("user.home");
        String downloadsDir = userHomeDir + File.separator + "Downloads";
        String pdfFilePath = downloadsDir + File.separator + "BookList.pdf";

        PDDocument document = new PDDocument();

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

        document.save(pdfFilePath);
        document.close();
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