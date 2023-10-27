import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthorsService } from 'src/app/_services/authors.service';
import { BooksService } from 'src/app/_services/books.service';

@Component({
  selector: 'app-display-authors',
  templateUrl: './display-authors.component.html',
  styleUrls: ['./display-authors.component.css']
})
export class DisplayAuthorsComponent {
  liste: any[] = [];
  p: number = 1;
  search: string = '';
  filteredAuthors: any[] = [];
  successAlertVisible = false;
  errorAlertVisible = false;
  message: string = "WAITING FOR DATA ";


  constructor(private router: Router, private cookieService: CookieService, private bookService : BooksService,private authorService : AuthorsService) {
    
      this.authorService.listeallAuthors().subscribe((data: any) => {
        data.forEach((element: any) => {
          console.log(element);
        });



        this.liste = data;
        this.filteredAuthors = data;
        this.DataLoaded() ;
      })
    


  }  role = this.cookieService.get("Role");

  
  filterAuthors() {
    this.filteredAuthors = this.liste.filter((client) => {
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
    if (confirm("Do you really want to delete this author  ?")) {

      console.log("id : "+id)
      this.authorService.deleteAuthor(id).subscribe(
        (response: any) => {
          console.log('Loan deleted successfully');
          this.errorAlertVisible = false;
          this.successAlertVisible = true;
        },
        (error: any) => {
          console.error('Error while deleting author:', error);
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
