import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/_services/books.service';

@Component({
  selector: 'app-display-category',
  templateUrl: './display-category.component.html',
  styleUrls: ['./display-category.component.css']
})
export class DisplayCategoryComponent {

  liste: any[] = [];
  p: number = 1;
  search: string = '';
  filteredCategorys: any[] = [];
  successAlertVisible = false;
  errorAlertVisible = false;
  message: string = "WAITING FOR DATA ";


  constructor(private router: Router, private bookService : BooksService) {
    
      this.bookService.listeallCategorys().subscribe((data: any) => {
        data.forEach((element: any) => {
         this.bookService.addCoutBooksCategory(element.id).subscribe((total: any) => {
          element.books = total; // Attach user data to the review object.
            //this.liste = review ;
         });
          console.log(element);
        });



        this.liste = data;
        this.filteredCategorys = data;
        this.DataLoaded() ;
      })
    


  }
  
  filterCategorys() {
    this.filteredCategorys = this.liste.filter((category) => {
      for (let key in category) {
        const value = category[key];
        if (value && value.toString().toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

  delete(id: any) {
    if (confirm("Do you really want to delete this category ?")) {

      console.log("id : "+id)
      this.bookService.deleteCategory(id).subscribe(
        (response: any) => {
          console.log('category deleted successfully',response);
          this.errorAlertVisible = false;
          this.successAlertVisible = true;
        },
        (error: any) => {
          console.error('Error while deleting category:', error);
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
