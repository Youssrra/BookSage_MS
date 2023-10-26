import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorsService } from 'src/app/_services/authors.service';
import { BooksService } from 'src/app/_services/books.service';
import { Book } from 'src/app/request/Book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent { 


  liste! : any ;
  book = new Book();
  selectCategory: any = '';
  selectAvaibility: any = false;
  successAlertVisible = false;
  errorAlertVisible = false;
  passwordMismatch: boolean = false;
  @ViewChild('form', { static: true }) form!: NgForm;
  selectAuthor : any = '';
  listeAuthor! : any ;

  constructor(private router : Router,private bookService: BooksService, private authorService: AuthorsService) {
    
  
  }

  ngOnInit(){

    this.bookService.listeallCategorys().subscribe((data: any) => {
      data.forEach((element: any) => {
      }); 
      this.liste = data ;
    })

    this.authorService.listeallAuthors().subscribe((data: any) => {
      data.forEach((element: any) => {
      }); 
      this.listeAuthor = data ;
    })



  }

  CreateBook() {

    this.book.avaibility = this.selectAvaibility ;
    this.book.author = this.selectAuthor ;

    console.log('Book : '+this.book);
    console.log('Category : '+this.selectCategory);


      this.bookService.addBook(this.book,this.selectCategory ).subscribe(
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
