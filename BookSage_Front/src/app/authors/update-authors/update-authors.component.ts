import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorsService } from 'src/app/_services/authors.service';
import { Author } from 'src/app/request/Author';

@Component({
  selector: 'app-update-authors',
  templateUrl: './update-authors.component.html',
  styleUrls: ['./update-authors.component.css']
})
export class UpdateAuthorsComponent {
  author = new Author();
  successAlertVisible = false;
  errorAlertVisible = false;
  @ViewChild('form', { static: true }) form!: NgForm;
  idAuthor !: any ;

 

  constructor(private router : Router, private authorService : AuthorsService ,private route:ActivatedRoute)
  {

     this.route.params.subscribe(params => {
       this.idAuthor = params['id'];
       // Use the 'id' parameter in your component logic
       console.log("idAuthor : "+this.idAuthor);
     });
  
  }

  ngOnInit(){

    this.authorService.getAuthortById(this.idAuthor).subscribe((data: any) => {
      this.author = data ;
    })
  
  }

  UpdateAuthor() {
    console.log('author name: '+this.author.name);
    console.log('author biography : '+this.author.biography);
      this.authorService.updateAuthor(this.author,this.idAuthor).subscribe(
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
