import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {


  constructor(private httpclient: HttpClient) { }


  public listeallEmprunts():Observable<any>{
    return this.httpclient.get("http://localhost:8280/Empruntes/getEmprunte",{responseType:"json"});
  }

  deleteEmprunt(id: any): Observable<any> {
    
      return this.httpclient.delete(`http://localhost:8280/Empruntes/supprimer/${id}`);

  }

  public getEmpruntById(id:any):Observable<any>{
    return this.httpclient.get(`http://localhost:8280/Empruntes/trouverEmprunte/${id}`,{responseType:"json"});
  }

  public addEmprunt(emprunt:any):Observable<any>{
    return this.httpclient.post("http://localhost:8280/Empruntes/creeEmprunte",emprunt,{responseType:"text"})

}

public updateEmprunt(emprunt:any,id : any):Observable<any>{
  return this.httpclient.put(`http://localhost:8280/Empruntes/modifierEmprunte/${id}`,emprunt,{responseType:"text"})
}
}
