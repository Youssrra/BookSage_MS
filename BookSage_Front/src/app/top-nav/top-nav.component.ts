import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import $ from 'jquery';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
 
  
  constructor(
    private route: Router, private cookieService: CookieService, 
    private userS : UserService) {
   
    
  }

    username = this.cookieService.get("username") ;
  ngOnInit() {
    $(document).ready(function() {
      // Toggle sidebar
      $('#menu_toggle').click(function() {
        $('body').toggleClass('nav-md nav-sm');
      });
    });
  

  }
  
  

  logout() {
    console.log("LOGOUT")
    this.cookieService.delete('Role');
    this.cookieService.delete('Token'); 
    this.cookieService.delete('username'); 
    this.userS.logout(this.username) ; 
    this.route.navigate(['/login'])
  }

}
