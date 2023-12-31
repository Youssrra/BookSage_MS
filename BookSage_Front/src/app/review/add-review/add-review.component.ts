import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReviewServiceService } from 'src/app/_services/review-service.service';
import { Review } from 'src/app/request/Review';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {

  liste! : any 
  review = new Review();
  selectBook: any = '';
  successAlertVisible = false;
  errorAlertVisible = false;
  passwordMismatch: boolean = false;
  @ViewChild('form', { static: true }) form!: NgForm;
  @Input() data: any;

  constructor(private router : Router,private cookieService: CookieService, private reviewService: ReviewServiceService) {
    
  }

  ngOnInit() {
    if (this.data) {
      console.log('Data received in Add Review component:', this.data);
    }
  }


 
  CreateReview() {

    const review = {
      "userId":  this.cookieService.get("id"),
      "bookId": this.data,
      "comment": this.review.comment,
      "rating": this.review.rating
    }
  
    this.reviewService.addReview(review).subscribe(
        (response: any) => {
          this.errorAlertVisible = false;
          this.successAlertVisible = true;
        },
        (error: any) => {
          this.successAlertVisible = false;
          this.errorAlertVisible = true;
        }
        )
  }
   
 
  
  closeSuccessAlert() {
    this.successAlertVisible = false;
    window.location.reload();
  }

  closeErrorAlert() {
    this.errorAlertVisible = false;
    window.location.reload();
  }

  checkPasswordMatch(password: string, confirmPassword: string): void {
    this.passwordMismatch = password !== confirmPassword;
  }

  isPasswordComplex(password: string): boolean {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    return uppercaseRegex.test(password) && numberRegex.test(password);
  }
  



}
