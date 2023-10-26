package tn.esprit.ms_livre.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.ms_livre.Entity.Book;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE b.title = ?1")
    List<Book> findBookByTitle(String title);

    @Query(
            value = "UPDATE books SET title = :title WHERE isbn = :isbn",
            nativeQuery = true)
    @Modifying
    @Transactional
    void updateBookTitleById(
            @Param("isbn") long isbn, @Param("title") String title);

    Integer countAllByCategory_Id(Long id) ;



}
