import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/_services/books.service';
import { EmpruntService } from 'src/app/_services/emprunt.service';
import { UserService } from 'src/app/_services/user.service';
import { Emprunt } from 'src/app/request/Emprunt';
import { Loan } from 'src/app/request/Loan';

@Component({
  selector: 'app-update-emprunt',
  templateUrl: './update-emprunt.component.html',
  styleUrls: ['./update-emprunt.component.css']
})
export class UpdateEmpruntComponent {
  
  listclient! : any ;
  listbook! : any ;
  loan = new Loan();
  selectBook: any = '';
  selectUser: any = ''; 
  
  selectAvaibility: any = false;
  successAlertVisible = false;
  errorAlertVisible = false;
  idLoan !: any ;
  
  @ViewChild('form', { static: true }) form!: NgForm;

 

  constructor(private router : Router,private bookService: BooksService, private empruntService:EmpruntService, private userService:UserService 
    , private route:ActivatedRoute)
  {

     this.route.params.subscribe(params => {
       this.idLoan = params['id'];
       // Use the 'id' parameter in your component logic
       console.log("idLoan : "+this.idLoan);
     });
    }

  ngOnInit(){

    this.empruntService.getEmpruntById(this.idLoan).subscribe((data: any) => {
      this.loan = data ;
    })
  

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

  UpdateLoan() {

    //this.loan.rendue = this.selectAvaibility ;
    //this.loan.idLivre = this.selectBook ;
    //this.loan.idUser = this.selectUser ;


    console.log('Loan : '+this.loan);
    console.log('Book : '+this.loan.idLivre);
    console.log('user : '+this.loan.idUser);
    console.log('rendue : '+this.selectAvaibility);
    console.log('desc  : '+this.loan.description);


      this.empruntService.updateEmprunt(this.loan,this.idLoan).subscribe(
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
