import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/request/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user !: User ; 
  myForm!: FormGroup ;

  constructor(
    private route: Router, private cookieService: CookieService ,  private userauth: UserAuthService,
    private userservice : UserService) {

    
  }


  ngOnInit(): void {

    
    this.userservice.DetailsUser(this.cookieService.get('id')).subscribe(
      data => {this.user = data ;
     
      console.log("   sdqsd"   + this.user.firstName);

    }
      )

  }
  verifyPhoneNumber(phone:string){
    const regex = /^([0-9]{1}){8}$/i;
    return regex.test(phone);

  }
   UpdateUserData(){ 
    console.log(this.user);


  //  console.log(u) ;
     this.userservice.UpdateUserData(this.cookieService.get('id') ,this.user).subscribe(data => {
      console.log("User Updated successfully")
    },
    (error: any) => {
      alert("coldnot update user")
    }  
    );  
  }




}