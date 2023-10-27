import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import FileSaver from 'file-saver';
import { CookieService } from 'ngx-cookie-service';
import { AuthorsService } from 'src/app/_services/authors.service';
import { BooksService } from 'src/app/_services/books.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-display-books',
  templateUrl: './display-books.component.html',
  styleUrls: ['./display-books.component.css']
})
export class DisplayBooksComponent {
  liste: any[] = [];
  p: number = 1;
  search: string = '';
  filteredBooks: any[] = [];
  successAlertVisible = false;
  errorAlertVisible = false;
  exportsuccessAlertVisible = false;
  exporterrorAlertVisible = false;
  message: string = "WAITING FOR DATA ";


  constructor(private bookService : BooksService, private authorService: AuthorsService, private httpclient: HttpClient, private cookieService: CookieService) {
    
      this.bookService.listeallBooks().subscribe((data: any) => {
        data.forEach((element: any) => {

          this.authorService.getAuthortById(element.author).subscribe(data2 => {
            
              element.author = data2 ;
          }
              );
          console.log(element);
        });



        this.liste = data;
        this.filteredBooks = data;
        this.DataLoaded() ;
      })
    


  }
  
  filterBooks() {
    this.filteredBooks = this.liste.filter((client) => {
      for (let key in client) {
        const value = client[key];
        if (value && value.toString().toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

  delete(id: any) {
    if (confirm("Do you really want to delete this book  ?")) {

      console.log("u=id : "+id)
      this.bookService.deleteBook(id).subscribe(
        (response: any) => {
          console.log('Book deleted successfully');
          this.errorAlertVisible = false;
          this.successAlertVisible = true;
        },
        (error: any) => {
          console.error('Error while deleting book:', error);
          console.log('Response body:', error?.error);
          this.successAlertVisible = false;
          this.errorAlertVisible = true;
        }
      );
    }
  }


  export() {
   
      if (confirm("Do you want to export user list  ?")) {
  
        this.httpclient.get('http://localhost:8686/ms_livre/books/generatepdf', { responseType: 'blob' }).subscribe(
          (data: Blob) => {
          
            FileSaver.saveAs(data, 'book_list.pdf');
            console.log('Book List exported successfully');
            this.exporterrorAlertVisible = false;
            this.exportsuccessAlertVisible = true;
          },
          (error) => {
            console.error('Failed to export data: ', error);
            console.error('Error while exporting book list:', error);
            console.log('Response body:', error?.error);
            this.exportsuccessAlertVisible = false;
            this.exporterrorAlertVisible = true;
          }
        );
        
        }
    
  }
  role = this.cookieService.get("Role");

  closeSuccessAlert() {
    this.successAlertVisible = false;
    window.location.reload();

  }

  closeErrorAlert() {
    this.errorAlertVisible = false;
    window.location.reload();

  }

  exportcloseSuccessAlert() {
    this.exportsuccessAlertVisible = false;
    //window.location.reload();

  }

  exportcloseErrorAlert() {
    this.exporterrorAlertVisible = false;
    //window.location.reload();

  }


  DataLoaded(){
    this.message ="DataLoaded";
  }




}
