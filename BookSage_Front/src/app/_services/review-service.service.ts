import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { Review } from '../request/Review';
@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {

  requestHeader = new HttpHeaders({"No-Auth":"True"});

  constructor(private httpclient: HttpClient) { }


  public listeallReviews():Observable<any>{
    return this.httpclient.get("http://localhost:5000/reviews",{responseType:"json"});
  }

  deleteReview(id: string): Observable<any> {
    
      return this.httpclient.delete(`http://localhost:5000/reviews/${id}`);

  }

  public listeallMyReviews(id:any):Observable<any>{
    return this.httpclient.get(`http://localhost:5000/reviews/user/${id}`,{responseType:"json"});
  }


  public listeAllBookReviews(id:any):Observable<any>{
    return this.httpclient.get(`http://localhost:5000/reviews/book/${id}`,{responseType:"json"});
  }

  public addReview(review:any):Observable<any>{
    return this.httpclient.post("http://localhost:5000/reviews",review,{responseType:"text"})

}
  
  //
  //  



}
