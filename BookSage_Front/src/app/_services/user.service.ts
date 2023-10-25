import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Login } from '../request/login';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from '../request/User';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestHeader = new HttpHeaders({"No-Auth":"True"});
  private url = "http://localhost:8888/";
  

  constructor(private httpclient: HttpClient,private userAuthService: UserAuthService) { }

  public login(login:Login):Observable<any>{
      return this.httpclient.post("http://localhost:8888/ms_gestion_user/users/signinn",login,{headers:this.requestHeader})
  }

  public logout(username:string):Observable<any>{
    console.log("session destroyed");
    const body = {
    "username" : username
    }
    return this.httpclient.post("http://localhost:8888/ms_gestion_user/users/logout",body,{headers:this.requestHeader})
}
/*
  public addAdmin(login:Login):Observable<any>{
    return this.httpclient.post("http://localhost:8888/users/signup/{id}",login,{headers:this.requestHeader})
}*/
  public test():Observable<any>{
    return this.httpclient.get("http://localhost:8888/ms_gestion_user/test",{responseType:"text"});
  }

  public listeAdmin():Observable<any>{
    return this.httpclient.get("http://localhost:8888/ms_gestion_user/users/getAllAdmin",{responseType:"json"});
  }

  public addAdmin(user:User):Observable<any>{
      return this.httpclient.post("http://localhost:8888/ms_gestion_user/users/signup",user,{responseType:"text"})
  
  }

  public addc(user:User):Observable<any>{
    return this.httpclient.post("http://localhost:8888/ms_gestion_user/users/AddClient",user,{responseType:"text"})

}


  public listeallClient():Observable<any>{
    return this.httpclient.get("http://localhost:8888/ms_gestion_user/users/getAllClient",{responseType:"json"});
  }


  
  public resetpwd(email:string):Observable<any>{
    
    
    return this.httpclient.put(`http://localhost:8888/ms_gestion_user/users/resetPwd/${email}`,{responseType:"text"});
  }
  public newpwd(code:string,pwd:string):Observable<any>{
    return this.httpclient.get(`http://localhost:8888/ms_gestion_user/users/verifiePwd/${code}/${pwd}`);
  }


  public DetailsUser(userId:string):Observable<any>{
   // console.log(this.httpclient.get(`ttp://localhost:1112/users/${id}`,{responseType:"json"}))
      return this.httpclient.get(`http://localhost:8888/ms_gestion_user/users/getUserById/${userId}`,{responseType:"json"});
  }

  
  public UpdateUserData(userId: string, user: any): Observable<any> {
    return this.httpclient.put(`http://localhost:8888/ms_gestion_user/users/update/${userId}`, user, { responseType: "text" });
  }

  deleteClient(id: string, role: any): Observable<any> {
    const url = ``;
    console.log("role to delete: " + role);
    if (role == 'ADMIN') {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userAuthService.getToken());
      console.log("TOK  . "+this.userAuthService.getToken());
      return this.httpclient.delete(`http://localhost:8888/ms_gestion_user/users/remove/${id}`,{ headers }).pipe(
        tap((response: any) => {
          console.log('Client deleted successfully:', response);
        }),
        catchError((error: any) => {
          console.error('Error while deleting client:', error);
          return of(error);
        })
      );
    } else {
      console.log('Unauthorized access: delete client');
      return of('Unauthorized access'); 
    }
  }
  
  


  public roleMatch(allowedRoles:any){
    let isMatch = false;
    const userRoles:any = this.userAuthService.getRoles();
    //console.log(allowedRoles);
    //console.log(userRoles);
    if(userRoles != null ) {
      //console.log("test")
       //for(let i=0;i<userRoles.length;i++){
        //console.log(userRoles.length)
        for(let j =0;allowedRoles.length;j++){
         // console.log(allowedRoles[j])
          if(userRoles === allowedRoles[j]){
           // console.log("true");
            isMatch = true ;
            
           return isMatch;
          } else {
           // console.log("false1")
            return isMatch;
          }
        }
       }
    //}
   // console.log("false");
    return isMatch;
  }
 
}
