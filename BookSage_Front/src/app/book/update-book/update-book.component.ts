import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from 'src/app/_services/authors.service';
import { BooksService } from 'src/app/_services/books.service';
import { Book } from 'src/app/request/Book';
import { BookC } from 'src/app/request/BookC';
import { Category } from 'src/app/request/Category';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {

  liste! : any 
  book =  new BookC() ;
  category = new Category();
  selectCategory: any = '';
  selectAvaibility: any = false;
  successAlertVisible = false;
  errorAlertVisible = false;
  passwordMismatch: boolean = false;
  @ViewChild('form', { static: true }) form!: NgForm;
  idBook !: any ;
  selectAuthor : any = '';
  listeAuthor! : any ;

 

  constructor(private router : Router,private bookService: BooksService , private route:ActivatedRoute, private authorService: AuthorsService )
  {

     this.route.params.subscribe(params => {
       this.idBook = params['id'];
       // Use the 'id' parameter in your component logic
       console.log("idBook : "+this.idBook);
     });
    }

ngOnInit(){
    
    this.bookService.listeallCategorys().subscribe((data: any) => {
      data.forEach((element: any) => {
      }); 
      this.liste = data ;
    })

    this.bookService.getBookById( this.idBook).subscribe(
      data => 
      {
        this.book = data ;
      console.log("   book detail"   + this.book );
    })

    this.authorService.listeallAuthors().subscribe((data: any) => {
      data.forEach((element: any) => {
      }); 
      this.listeAuthor = data ;
    })



  }

  CreateBook() {

    //this.book.avaibility = this.selectAvaibility ;
    this.book.id = this.idBook ;

    console.log('Book : '+this.idBook,this.book.author,this.book.avaibility,this.book.isbn,this.book.price,this.book.title);
    console.log('Category : '+this.book.category);
 

    this.bookService.getCategoryById(this.book.category.id ).subscribe(
      (response: any) => {
        this.book.category = response ;
      },
      (error: any) => {
       console.log(error);
       });
    

      this.bookService.updateBook(this.book).subscribe(
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
