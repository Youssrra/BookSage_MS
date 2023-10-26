import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private httpclient: HttpClient) { }


  public listeallAuthors():Observable<any>{
    return this.httpclient.get("http://localhost:8787/authors/getall",{responseType:"json"});
  }

  deleteAuthor(id: any): Observable<any> {
    
      return this.httpclient.delete(`http://localhost:8787/authors/delete/${id}`);

  }

  public getAuthortById(id:any):Observable<any>{
    return this.httpclient.get(`http://localhost:8787/authors/getById/${id}`,{responseType:"json"});
  }

  public addAuthor(author:any):Observable<any>{
    return this.httpclient.post("http://localhost:8787/authors/add",author,{responseType:"text"})

}

public updateAuthor(author:any,id : any):Observable<any>{
  return this.httpclient.put(`http://localhost:8787/authors/update/${id}`,author,{responseType:"text"})
}}
