import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReviewServiceService } from 'src/app/_services/review-service.service';
import { Review } from 'src/app/request/Review';

@Component({
  selector: 'app-display-my-reviews',
  templateUrl: './display-my-reviews.component.html',
  styleUrls: ['./display-my-reviews.component.css']
})
export class DisplayMyReviewsComponent {

  liste: any[] = [];
  p: number = 1;
  search: string = '';
  filteredReviews: any[] = [];
  successAlertVisible = false;
  errorAlertVisible = false;
  message: string = "WAITING FOR DATA ";
  selectedReview: any; // Define a variable to store the selected review

    constructor( private router: Router, private cookieService: CookieService, private reviewServiec: ReviewServiceService) {

      this.reviewServiec.listeallMyReviews(this.cookieService.get("id")).subscribe((data: any) => {
        data.forEach((element: any) => {
          console.log(element);
        });

        this.liste = data;
        this.filteredReviews = data;
        this.DataLoaded() ;
      })
    

    }

// In your component or JavaScript file

// Function to open the custom modal and populate it with review details
 openCustomModal(review:any) {
  const modal = document.getElementById("customModal");
  const modalContent = document.getElementById("modalContent");

  if (modalContent) { // Check if modalContent is not null
    // Populate the modal content with review details
    modalContent.innerHTML = `
      <p><strong>REVIEW ID:</strong> ${review._id}</p>
      <p><strong>BOOK:</strong> ${review.bookId}</p>
      <p><strong>COMMENT:</strong> ${review.comment}</p>
      <p><strong>RATE:</strong> ${review.rating}</p>
    `;
  }

  if (modal) {
    modal.style.display = "block";
  }

  // Close the modal when the close button is clicked
  const closeModalButton = document.getElementById("closeModal");
  if (closeModalButton) { // Check if closeModalButton is not null
    closeModalButton.onclick = function() {
      if (modal) {
        modal.style.display = "none";
      }
    };
  }
}




    filterReviews() {
      this.filteredReviews = this.liste.filter((client) => {
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
      if (confirm("Do you really want to delete this review  ?")) {
        const role = this.cookieService.get("Role");
        this.reviewServiec.deleteReview(id).subscribe(
          (response: any) => {
            console.log('Review deleted successfully:', response);
            this.errorAlertVisible = false;
            this.successAlertVisible = true;
          },
          (error: any) => {
            console.error('Error while deleting review:', error);
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
