import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorsService } from 'src/app/_services/authors.service';
import { Author } from 'src/app/request/Author';

@Component({
  selector: 'app-add-authors',
  templateUrl: './add-authors.component.html',
  styleUrls: ['./add-authors.component.css']
})
export class AddAuthorsComponent {
 
  author = new Author();
  successAlertVisible = false;
  errorAlertVisible = false;
  @ViewChild('form', { static: true }) form!: NgForm;

 

  constructor(private router : Router, private authorService : AuthorsService ) {
    
  
  }

  CreateAuthor() {
    console.log('author name: '+this.author.name);
    console.log('author biography : '+this.author.biography);
      this.authorService.addAuthor(this.author).subscribe(
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
