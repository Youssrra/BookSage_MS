import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error403Component } from './error/error403/error403.component';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error/error404/error404.component';
import { Error500Component } from './error/error500/error500.component';
import { MainComponent } from './main/main.component';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { DisplayadminComponent } from './displayadmin/displayadmin.component'; 
//import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CreateadminComponent } from './createadmin/createadmin.component';
import { CreateclientComponent } from './createclient/createclient.component';
import { DetailAdminComponent } from './detail-admin/detail-admin.component';
import { AuthGuard } from './_auth/auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';



const routes: Routes = [
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginCompComponent },
  { path: 'users/admins', component: DisplayadminComponent},
  { path: 'admin/new', component: CreateadminComponent},
  { path: 'admin/:id', component: DetailAdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users/clients', component: ClientComponent  },
  { path: 'client/new', component: CreateclientComponent },
  { path: 'client/:id', component: DetailClientComponent },
  { path: 'forgetpassword', component: ResetPasswordComponent },
  { path: 'newpassword/:code', component: NewpasswordComponent },
  { path: 'forbidden', component: ErrorPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user/update/:id', component: UpdateClientComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
