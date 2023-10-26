import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  message: string = "WAITING FOR DATA ";


  constructor(private auth: UserService, private router: Router, private cookieService: CookieService, private bookService : BooksService, private authorService: AuthorsService) {
    
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

  closeSuccessAlert() {
    this.successAlertVisible = false;
    window.location.reload();

  }

  closeErrorAlert() {
    this.errorAlertVisible = false;
    window.location.reload();

  }


  DataLoaded(){
    this.message ="DataLoaded";
  }




}
