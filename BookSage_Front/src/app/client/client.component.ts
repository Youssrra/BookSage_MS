import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  liste: any[] = [];
  p: number = 1;
  search: string = '';
  filteredClients: any[] = [];
  successAlertVisible = false;
  errorAlertVisible = false;
  isGridView: boolean = false;
  message: string = "WAITING FOR DATA ";
   exportsuccessAlertVisible = false;
  exporterrorAlertVisible = false;

  
  constructor(private auth: UserService, private router: Router, private cookieService: CookieService,
    private httpclient: HttpClient) {
    //  console.log("test");
   


      //
      this.auth.listeallClient().subscribe((data: any) => {
        //console.log("data is here-----------");
        data.forEach((element: any) => {
          console.log(element);
        });



        this.liste = data;
        this.filteredClients = data;
        this.DataLoaded() ;
      })
    


  }

  role = this.cookieService.get("Role");
  GoToCreateClient() {
    this.router.navigate(['/client/new']);
  }

  
  filterClients() {
    this.filteredClients = this.liste.filter((client) => {
      for (let key in client) {
        const value = client[key];
        if (value && value.toString().toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

  GoTOClientDetails(id: any) {
    this.router.navigate(['/client/' + id]);
  }

  delete(id: any) {
    if (confirm("Do you really want to delete this client  ?")) {
      const role = this.cookieService.get("Role");
      this.auth.deleteClient(id, role).subscribe(
        (response: any) => {
          console.log('Client deleted successfully:', response);
          this.errorAlertVisible = false;
          this.successAlertVisible = true;
        },
        (error: any) => {
          console.error('Error while deleting client:', error);
          console.log('Response body:', error?.error);
          this.successAlertVisible = false;
          this.errorAlertVisible = true;
        }
      );
    }
  }

  export() {
    if (confirm("Do you want to export user list  ?")) {

      this.httpclient.get('http://localhost:8888/ms_gestion_user/users/export/clients', { responseType: 'blob' }).subscribe(
        (data: Blob) => {
        
          FileSaver.saveAs(data, 'clients.xlsx');
          console.log('client List exported successfully');
          this.exporterrorAlertVisible = false;
          this.exportsuccessAlertVisible = true;
        },
        (error) => {
          console.error('Failed to export data: ', error);
          console.error('Error while exporting client list:', error);
          console.log('Response body:', error?.error);
          this.exportsuccessAlertVisible = false;
          this.exporterrorAlertVisible = true;
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


  exportcloseSuccessAlert() {
    this.exportsuccessAlertVisible = false;
    //window.location.reload();

  }

  exportcloseErrorAlert() {
    this.exporterrorAlertVisible = false;
    //window.location.reload();

  }

  DataLoaded(){
    this.message ="DataLoaded";
  }






}
