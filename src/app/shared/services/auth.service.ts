import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44347/api/'
  isLogin: boolean = false

  constructor(private _HttpClient:HttpClient) { }

  // ************************************ Users ************************************

  // user login
  login(login: User) :Observable<User>{
    return this._HttpClient.post<User>(this.apiUrl + 'Auth/Login', login)
  }

  // user login
  register(register: any) :Observable<User>{
    return this._HttpClient.post<User>(this.apiUrl + 'Auth/Register', register)
  }

}
