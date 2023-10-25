import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BooksService } from 'src/app/_services/books.service';
import { EmpruntService } from 'src/app/_services/emprunt.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-display-emprunt',
  templateUrl: './display-emprunt.component.html',
  styleUrls: ['./display-emprunt.component.css']
})
export class DisplayEmpruntComponent {
  liste: any[] = [];
  p: number = 1;
  search: string = '';
  filteredEmprunts: any[] = [];
  successAlertVisible = false;
  errorAlertVisible = false;
  message: string = "WAITING FOR DATA ";


  constructor(private auth: UserService, private router: Router, private cookieService: CookieService, private bookService : BooksService,
    private empruntService: EmpruntService) {
    
      this.empruntService.listeallEmprunts().subscribe((data: any) => {
        data.forEach((element: any) => {

          this.bookService.getBookById(element.idLivre).subscribe((data: any) => {
            element.idLivre = data ;
          });

          this.auth.DetailsUser(element.idUser).subscribe((data: any) => {
            element.idUser = data ;
          });
          
          console.log(element);
        });



        this.liste = data;
        this.filteredEmprunts = data;
        this.DataLoaded() ;
      })
    


  }
  
  filterEmprunts() {
    this.filteredEmprunts = this.liste.filter((client) => {
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
    if (confirm("Do you really want to delete this loan  ?")) {

      console.log("id : "+id)
      this.empruntService.deleteEmprunt(id).subscribe(
        (response: any) => {
          console.log('Loan deleted successfully');
          this.errorAlertVisible = false;
          this.successAlertVisible = true;
        },
        (error: any) => {
          console.error('Error while deleting loan:', error);
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
