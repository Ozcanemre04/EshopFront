import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ILoginRequest } from 'src/app/interface/Auth/Login/ILoginRequest';
import { ILoginResponse } from 'src/app/interface/Auth/Login/ILoginResponse';
import { IRegisterRequest } from 'src/app/interface/Auth/Register/IRegisterRequest';
import { IRegisterResponse } from 'src/app/interface/Auth/Register/IRegisterResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = environment.apiUrl;
  private connectedSubject = new BehaviorSubject<boolean>(false);
  public connected = this.connectedSubject.asObservable();
 

   constructor(private http: HttpClient,private router:Router) {
    const user = localStorage.getItem('ACCESS_TOKEN');
    if (user) {
      this.connectedSubject.next(true);
    }
    }


   onLoginSubmit(access:string,refresh:string){
          localStorage.setItem("ACCESS_TOKEN",access)
          localStorage.setItem("REFRESH_TOKEN",refresh)
          localStorage.setItem("Connected","true")
          this.router.navigate(['','']) 
          return this.connectedSubject.next(true);
   }
   logout() {
       localStorage.removeItem("ACCESS_TOKEN");
       localStorage.removeItem("REFRESH_TOKEN");
       localStorage.removeItem("Connected");
       return this.connectedSubject.next(false);

 }
    onLogin(login:Partial<ILoginRequest>):Observable<ILoginResponse>{
      return this.http.post<ILoginResponse>(this.baseUrl+'/api/Auth/Login',login);
    }
    onRegister(register:Partial<IRegisterRequest>):Observable<IRegisterResponse>{
      return this.http.post<IRegisterResponse>(this.baseUrl+'/api/Auth/Register',register);
    }
  
  
  refreshToken():Observable<any>{
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    let email:string="";
    let token = localStorage.getItem("ACCESS_TOKEN")
    if(token){

      let decodedToken:any = jwtDecode(token)
      email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    }

    if (!token||!refreshToken ||!email) {
      throw new Error("No refresh or email available");
    }
  
    const payload = {
      Email:email,
      RefreshToken: refreshToken
    };
    return this.http.post(this.baseUrl+'/api/Auth/Refresh-Token',payload);
  }
}
