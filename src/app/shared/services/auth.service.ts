import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.algoritmUrl
  // apiUrl = environment.smarterUrl
  // apiUrl = environment.localUrl
  isLogin: boolean = false

  constructor(private _HttpClient: HttpClient) { }


  // ************************************ lgoin ************************************

  // login
  login(login: User): Observable<User> {
    return this._HttpClient.post<User>(this.apiUrl + 'Auth/Login', login)
  }

  // forget password
  forgetPassword(email: string): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'Auth/ForgetPassword', email)
  }

  // reset password
  resetPassword(reset: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'Auth/ResetPassword', reset)
  }


}
