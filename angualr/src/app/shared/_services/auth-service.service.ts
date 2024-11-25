import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  Url:string = environment.apiBaseUrl + '/Authentication'
  constructor(private router: Router,
    private http: HttpClient
  ){} 
 

  createUserRegister(registerData:any){
    return this.http.post(this.Url+'/register',registerData);
  }

  loginUser(loginData:any){
    return this.http.post(this.Url+'/login',loginData);
  }


  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  // canAccess() {
  //   if (!this.isAuthenticated()) {
  //     this.router.navigate(['/login'])
  //   }
  // }

}
