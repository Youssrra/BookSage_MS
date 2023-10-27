import { Route, Router, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { DisplayadminComponent } from './displayadmin/displayadmin.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthGuard } from './_auth/auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CreateadminComponent } from './createadmin/createadmin.component';
import { CreateclientComponent } from './createclient/createclient.component';
import { DetailAdminComponent } from './detail-admin/detail-admin.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { DetailClientComponent } from './detail-client/detail-client.component';

import { SideBarComponent } from './side-bar/side-bar.component';
import { TopNavComponent } from './top-nav/top-nav.component';
//import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { MenuFooterButtonsComponent } from './menu-footer-buttons/menu-footer-buttons.component';
import { Error404Component } from './error/error404/error404.component';
import { Error500Component } from './error/error500/error500.component';
import { Error403Component } from './error/error403/error403.component';
import { ProfileComponent } from './user/profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateClientComponent } from './update-client/update-client.component';
import { AlertComponent } from './shared/alert/alert.component';
import { MultiStepFormComponent } from './multi-step-form/multi-step-form.component';
import { DisplayReviewsComponent } from './review/display-reviews/display-reviews.component';
import { AddReviewComponent } from './review/add-review/add-review.component';
import { UpdateReviewComponent } from './review/update-review/update-review.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DisplayMyReviewsComponent } from './review/display-my-reviews/display-my-reviews.component';
import { DisplayBooksComponent } from './book/display-books/display-books.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { UpdateBookComponent } from './book/update-book/update-book.component';
import { DisplayCategoryComponent } from './category/display-category/display-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddEmpruntComponent } from './emprunt/add-emprunt/add-emprunt.component';
import { DisplayEmpruntComponent } from './emprunt/display-emprunt/display-emprunt.component';
import { UpdateEmpruntComponent } from './emprunt/update-emprunt/update-emprunt.component';
import { DisplayAuthorsComponent } from './authors/display-authors/display-authors.component';
import { AddAuthorsComponent } from './authors/add-authors/add-authors.component';
import { UpdateAuthorsComponent } from './authors/update-authors/update-authors.component';
import { BooksAuthorsComponent } from './authors/books-authors/books-authors.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginCompComponent,
    DisplayadminComponent,
    LeftSideComponent,
    NavBarComponent,
    HomeComponent,
    ClientComponent,
    SideBarComponent,
    TopNavComponent,
    HomeComponent,
    FooterComponent,
    MainComponent,
    MenuFooterButtonsComponent,
    Error404Component,
    Error500Component,
    Error403Component,
    ProfileComponent,
    ResetPasswordComponent,
    CreateadminComponent,
    CreateclientComponent,
    DetailAdminComponent,
    ErrorPageComponent,
    NewpasswordComponent,
    UpdateClientComponent,
    AlertComponent,
    DetailClientComponent,
    MultiStepFormComponent,
    DisplayReviewsComponent,
    AddReviewComponent,
    UpdateReviewComponent,
    DisplayMyReviewsComponent,
    DisplayBooksComponent,
    AddBookComponent,
    UpdateBookComponent,
    DisplayCategoryComponent,
    AddCategoryComponent,
    AddEmpruntComponent,
    DisplayEmpruntComponent,
    UpdateEmpruntComponent,
    DisplayAuthorsComponent,
    AddAuthorsComponent,
    UpdateAuthorsComponent,
    BooksAuthorsComponent,
    UpdateUserComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule , 
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    DropDownListModule,
 
  ],
  providers: [AuthGuard, 
  {
    provide : HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor, 
    multi : true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }