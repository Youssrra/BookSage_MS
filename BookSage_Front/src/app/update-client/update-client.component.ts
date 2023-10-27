import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/request/User';
@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent {


  user !: User ; 
  myForm!: FormGroup ;
  id !: any ;
  successAlertVisible = false;
  errorAlertVisible = false;
  selectAvaibility: any = false;

  constructor(
    private route: Router, private cookieService: CookieService ,  private userauth: UserAuthService,
    private userservice : UserService,   private router: ActivatedRoute) {

    
  }


  ngOnInit(): void {

    this.router.params.subscribe(params => {
      this.id = params['id'];
      // Use the 'id' parameter in your component logic
      console.log("hello"+this.id);
    });

    this.userservice.DetailsUser(this.id).subscribe(
      data => {this.user = data ;
     
      console.log("   sdqsd"   + this.user.firstName);

    }
      )

  }
 
   UpdateUserData(){ 
    console.log(this.user);


  //  console.log(u) ;
     this.userservice.UpdateUserData(this.id ,this.user).subscribe((response: any) => {
      this.errorAlertVisible = false;
      this.successAlertVisible = true;
    },
    (error: any) => {
      this.successAlertVisible = false;
      this.errorAlertVisible = true;
    }
    );
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
