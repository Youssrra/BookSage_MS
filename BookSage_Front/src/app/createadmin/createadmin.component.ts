import { Component, ViewChild } from '@angular/core';
import { User } from '../request/User';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createadmin',
  templateUrl: './createadmin.component.html',
  styleUrls: ['./createadmin.component.css']
})
export class CreateadminComponent {
  
  user = new User();         //dfdfdfdf
  passwordMismatch: boolean = false;
  @ViewChild('form', { static: true }) form!: NgForm;
  successAlertVisible = false;
  errorAlertVisible = false;
  constructor(private userservice:UserService , private router : Router){
    //this.user = new User();
  }
  createNewAdmin(){
    console.log(this.user);
     this.userservice.addAdmin(this.user).subscribe(  (response: any) => {
    
      this.errorAlertVisible = false;
      this.successAlertVisible = true;
    },
    (error: any) => {
      this.successAlertVisible = false;
      this.errorAlertVisible = true;
    }    );
  }
   
 
  
  closeSuccessAlert() {
    this.successAlertVisible = false;
    window.location.reload();
  }

  closeErrorAlert() {
    this.errorAlertVisible = false;
    window.location.reload();
  }

  cancelCreate(){
    
  }

  checkPasswordMatch(password: string, confirmPassword: string): void {
    this.passwordMismatch = password !== confirmPassword;
  }
}
