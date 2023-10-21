import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReviewServiceService } from 'src/app/_services/review-service.service';

@Component({
  selector: 'app-display-reviews',
  templateUrl: './display-reviews.component.html',
  styleUrls: ['./display-reviews.component.css']
})
export class DisplayReviewsComponent {

  liste: any[] = [];
  p: number = 1;
  search: string = '';
  filteredReviews: any[] = [];
  successAlertVisible = false;
  errorAlertVisible = false;
  message: string = "WAITING FOR DATA ";
  id !: any ;
  initialData: any; 

    constructor(private auth: UserService, private router: Router, private cookieService: CookieService, 
      private reviewServiec: ReviewServiceService,private route: ActivatedRoute)
     {

        this.route.params.subscribe(params => {
          this.id = params['id'];
          // Use the 'id' parameter in your component logic
          console.log("hello"+this.id);
        });

        
      this.reviewServiec.listeAllBookReviews(this.id).subscribe((data: any) => {
        data.forEach((element: any) => {
          this.auth.DetailsUser(element.userId).subscribe((user: any) => {
            element.userId = user; // Attach user data to the review object.
            //this.liste = review ;
          });
          console.log(element);
        });

        this.liste = data;
        this.filteredReviews = data;
        this.DataLoaded() ;
      })
    

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
  
  
    openCustomModal(review:any) {
      const modal = document.getElementById("customModal");
      const modalContent = document.getElementById("modalContent");
    
      if (modalContent) { // Check if modalContent is not null
        // Populate the modal content with review details
        modalContent.innerHTML = `
          <p class="modal-text"><strong class="modal-title">REVIEW ID:</strong> ${review._id}</p>
          <p class="modal-text"><strong class="modal-title">USER:</strong> ${review.userId.username}</p>
          <p class="modal-text"><strong class="modal-title">COMMENT:</strong> ${review.comment}</p>
          <p class="modal-text"><strong class="modal-title">RATE:</strong> ${review.rating}</p>
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

    openAddModalWithInitialData() {
   
       this.initialData = this.id ;
    }  


}
