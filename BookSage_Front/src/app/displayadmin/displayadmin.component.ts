import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-displayadmin',
  templateUrl: './displayadmin.component.html',
  styleUrls: ['./displayadmin.component.css']
})
export class DisplayadminComponent { 
  search: string = '';
  liste: any[] = [];
  filteredAdmins: any[] = [];
  role = this.cookieService.get('Role');
  p: number = 1;
  showElements: boolean = false;
  isGridView: boolean = false;
  message : string = "WAITING FOR DATA "; 
  successAlertVisible = false;
  errorAlertVisible = false;
  exportsuccessAlertVisible = false;
  exporterrorAlertVisible = false;

  constructor(
    private auth: UserService,
    private router: Router,
    private cookieService: CookieService,
    private httpclient: HttpClient
  ) {
    console.log('ROLE: ' + this.role); 

    if (this.role == 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (this.role == 'CLIENT') {
      this.router.navigate(['/forbidden']);
    } else {
      this.router.navigate(['/login']);
    }
 
    this.auth.listeAdmin().subscribe((data: any) => {
      this.liste = data;
      this.filteredAdmins = data; // Initialize filteredAdmins with the full list initially
     this.DataLoaded() ; 
    });
  }

  filterAdmins() {
    this.filteredAdmins = this.liste.filter((admin) => {
      for (let key in admin) {
        const value = admin[key];
        if (value && value.toString().toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

  DataLoaded(){
    this.message ="DataLoaded";
  }
  

  GoToAdminDetails(id: any) {
    console.log(id); 
    const params = { id: id };
    this.router.navigate(['/admin/' + id]);
  }

  GoToCreateAdmin() {
    this.router.navigate(['/admin/new']);
  }
  

  delete(id: any) {
    if (confirm("Do you really want to delete this admin ?")) {
      const role = this.cookieService.get("Role");
      this.auth.deleteClient(id, role).subscribe(
        (response: any) => {
          console.log('Admin deleted successfully:', response);
          this.errorAlertVisible = false;
          this.successAlertVisible = true;
        },
        (error: any) => {
          console.error('Error while deleting admin:', error);
          console.log('Response body:', error?.error);
          this.successAlertVisible = false;
          this.errorAlertVisible = true;
        }
      );
    }
  }

  export() {
    if (confirm("Do you want to export user list  ?")) {

      this.httpclient.get('http://localhost:8888/ms_gestion_user/users/export/admins', { responseType: 'blob' }).subscribe(
        (data: Blob) => {
        
          FileSaver.saveAs(data, 'admins.xlsx');
          console.log('Admin List exported successfully');
          this.exporterrorAlertVisible = false;
          this.exportsuccessAlertVisible = true;
        },
        (error) => {
          console.error('Failed to export data: ', error);
          console.error('Error while exporting admin list:', error);
          console.log('Response body:', error?.error);
          this.exportsuccessAlertVisible = false;
          this.exporterrorAlertVisible = true;
        }
      );
      
      }
  }

  exportBooksToPdf() {
    // Send an HTTP request to the backend API to generate and serve the PDF
    
  }


  closeSuccessAlert() {
    this.successAlertVisible = false;
    window.location.reload();

  }

  closeErrorAlert() {
    this.errorAlertVisible = false;
    window.location.reload();

  }

  exportcloseSuccessAlert() {
    this.exportsuccessAlertVisible = false;
    //window.location.reload();

  }

  exportcloseErrorAlert() {
    this.exporterrorAlertVisible = false;
    //window.location.reload();

  }
  
}
