import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './../models/user';
import { Owner } from './../models/owner';
import { Unit } from '../models/unit';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://192.168.1.254:5214/api/'
  // apiUrl = 'https://localhost:5001/api/'
  isLogin: boolean = false

  constructor(private _HttpClient: HttpClient) { }

  // ************************************ Users ************************************

  // user login
  login(login: User): Observable<User> {
    return this._HttpClient.post<User>(this.apiUrl + 'Auth/Login', login)
  }

  // create user
  addUser(register: any): Observable<User> {
    return this._HttpClient.post<User>(this.apiUrl + 'Auth/Register', register)
  }

  // ************************************ Owners ************************************

  // get all owners
  getOwners(): Observable<Owner[]>{
    return this._HttpClient.get<Owner[]>(this.apiUrl + 'Auth/GetOwners')
  }

  // ************************************ Owners ************************************

  // add unit
  addUnit(unit: Unit): Observable<Unit>{
    return this._HttpClient.post<Unit>(this.apiUrl + 'Unit/Create', unit)
  }

  // get all units
  getUnits(): Observable<Unit[]>{
    return this._HttpClient.get<Unit[]>(this.apiUrl + 'Unit/GetAll')
  }

}
