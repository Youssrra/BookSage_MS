import { NgModule } from '@angular/core';
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
import { DisplayReviewsComponent } from './review/display-reviews/display-reviews.component';
import { AddReviewComponent } from './review/add-review/add-review.component';
import { UpdateReviewComponent } from './review/update-review/update-review.component';
import { DisplayMyReviewsComponent } from './review/display-my-reviews/display-my-reviews.component';
import { DisplayBooksComponent } from './book/display-books/display-books.component';
import { DisplayCategoryComponent } from './category/display-category/display-category.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { UpdateBookComponent } from './book/update-book/update-book.component';
import { DisplayEmpruntComponent } from './emprunt/display-emprunt/display-emprunt.component';
import { AddEmpruntComponent } from './emprunt/add-emprunt/add-emprunt.component';
import { UpdateEmpruntComponent } from './emprunt/update-emprunt/update-emprunt.component';
import { DisplayAuthorsComponent } from './authors/display-authors/display-authors.component';
import { AddAuthorsComponent } from './authors/add-authors/add-authors.component';
import { UpdateAuthorsComponent } from './authors/update-authors/update-authors.component';
import { BooksAuthorsComponent } from './authors/books-authors/books-authors.component';
import { Routes, RouterModule } from '@angular/router';

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
  { path: 'books/reviews/:id', component: DisplayReviewsComponent },
  { path: 'reviews/add', component: AddReviewComponent },
  { path: 'reviews/update/:id', component: UpdateReviewComponent },
  { path: 'myreviews', component: DisplayMyReviewsComponent },
  { path: 'books', component: DisplayBooksComponent },
  { path: 'books/category', component: DisplayCategoryComponent },
  { path: 'books/add', component: AddBookComponent },
  { path: 'books/category/add', component: AddCategoryComponent },
  { path: 'books/update/:id', component: UpdateBookComponent },
  { path: 'loans', component: DisplayEmpruntComponent },
  { path: 'loans/add', component: AddEmpruntComponent },
  { path: 'loans/update/:id', component: UpdateEmpruntComponent },
  { path: 'authors', component: DisplayAuthorsComponent },
  { path: 'authors/add', component: AddAuthorsComponent },
  { path: 'authors/update/:id', component: UpdateAuthorsComponent },
  { path: 'authors/books/:id', component: BooksAuthorsComponent },





  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
