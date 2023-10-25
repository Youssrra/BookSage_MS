import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/_services/books.service';
import { EmpruntService } from 'src/app/_services/emprunt.service';
import { UserService } from 'src/app/_services/user.service';
import { Emprunt } from 'src/app/request/Emprunt';

@Component({
  selector: 'app-add-emprunt',
  templateUrl: './add-emprunt.component.html',
  styleUrls: ['./add-emprunt.component.css']
})
export class AddEmpruntComponent {


  listclient! : any 
  listbook! : any 
  loan = new Emprunt();
  selectBook: any = '';
  selectUser: any = '';
  
  selectAvaibility: any = false;
  successAlertVisible = false;
  errorAlertVisible = false;
  passwordMismatch: boolean = false;
  @ViewChild('form', { static: true }) form!: NgForm;

 

  constructor(private router : Router,private bookService: BooksService, private empruntService:EmpruntService, private userService:UserService ) {
    
  
  }

  ngOnInit(){

    this.userService.listeallClient().subscribe((data: any) => {
      data.forEach((element: any) => {
      }); 
      this.listclient = data ;
    })

    this.bookService.listeallBooks().subscribe((data: any) => {
      data.forEach((element: any) => {
      }); 
      this.listbook = data ;
    })

  }

  CreateLoan() {

    this.loan.rendue = this.selectAvaibility ;
    this.loan.idLivre = this.selectBook ;
    this.loan.idUser = this.selectUser ;


    console.log('Book : '+this.loan);
    console.log('Book : '+this.selectBook);
    console.log('user : '+this.selectUser);
    console.log('rendue : '+this.selectAvaibility);

    



      this.empruntService.addEmprunt(this.loan).subscribe(
        (response: any) => {
          this.errorAlertVisible = false;
          this.successAlertVisible = true;
        },
        (error: any) => {
          this.successAlertVisible = false;
          this.errorAlertVisible = true;
         });
  }
  
 
  
  closeSuccessAlert() {
    this.successAlertVisible = false;
    window.location.reload();
  }

  closeErrorAlert() {
    this.errorAlertVisible = false;
    window.location.reload();
  }






}
