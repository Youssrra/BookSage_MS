import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
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


    constructor(private renderer: Renderer2,
      private elementRef: ElementRef,private auth: UserService, private router: Router, private cookieService: CookieService, private reviewServiec: ReviewServiceService) {

      this.reviewServiec.listeallReviews().subscribe((data: any) => {
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

    
  ngAfterViewInit() {
    $(document).ready(() => {
      this.renderer.listen(this.elementRef.nativeElement, 'click', (event: any) => {
        // Check if the clicked element has a specific class that represents the sidebar toggle button
        if ($(event.target).hasClass('sidebar-toggle-button')) {
          // Toggle the sidebar by adding/removing a CSS class
          $('.sidebar').toggleClass('sidebar-hidden');
        }
      });
  
      $('.nav.child_menu li.active').parents('ul').slideDown();
    });
  
//    console.log("role !" + this.role);
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
