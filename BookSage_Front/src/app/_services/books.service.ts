import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {


  constructor(private httpclient: HttpClient) { }


  public listeallBooks():Observable<any>{
    return this.httpclient.get("http://localhost:8686/ms_livre/books/all",{responseType:"json"});
  }

  public deleteBook(id: string): Observable<any> {

      return this.httpclient.delete(`http://localhost:8686/ms_livre/books/delete/${id}`,{responseType:"text"});

  }

  public getBookById(id:any):Observable<any>{
    return this.httpclient.get(`http://localhost:8686/ms_livre/books/${id}`,{responseType:"json"});
  }

  public addBook(book:any,id : any):Observable<any>{
    return this.httpclient.post(`http://localhost:8686/ms_livre/books/add/${id}`,book,{responseType:"text"})
  }

  public updateBook(book:any):Observable<any>{
    return this.httpclient.put(`http://localhost:8686/ms_livre/books/update`,book,{responseType:"text"})
  }

  public getBookByIdAuthor(id:any):Observable<any>{
    return this.httpclient.get(`http://localhost:8686/ms_livre/books/authors/${id}`,{responseType:"json"});
  }



  //CATEGORY


  public listeallCategorys():Observable<any>{
    return this.httpclient.get("http://localhost:8686/ms_livre/categories/all",{responseType:"json"});
  }

  public deleteCategory(id: string): Observable<any> {

      return this.httpclient.delete(`http://localhost:8686/ms_livre/categories/delete/${id}`,{responseType:"text"});

  }
  public getCategoryById(id:any):Observable<any>{
    return this.httpclient.get(`http://localhost:8686/ms_livre/categories/${id}`,{responseType:"json"});
  }


  public addCategory(category:any):Observable<any>{
    return this.httpclient.post(`http://localhost:8686/ms_livre/categories/add`,category,{responseType:"text"})
  }

  //
  public addCoutBooksCategory(id:any):Observable<any>{
    return this.httpclient.get(`http://localhost:8686/ms_livre/books/coutBooksCategory/${id}`)
  }

}

