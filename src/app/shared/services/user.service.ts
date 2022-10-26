import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Owner } from './../models/owner';
import { Unit } from '../models/unit';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://192.168.1.254:5214/api/'


  constructor(private _HttpClient: HttpClient) { }

  // ************************************ Users ************************************

  // create user
  addUser(register: any): Observable<User> {
    return this._HttpClient.post<User>(this.apiUrl + 'Auth/Register', register)
  }

  // get all users
  getUsers(): Observable<User[]>{
    return this._HttpClient.get<User[]>(this.apiUrl + 'Auth/GetAllUsers')
  }

   // ************************************ Owners ************************************

  // get all owners
  getOwners(): Observable<Owner[]>{
    return this._HttpClient.get<Owner[]>(this.apiUrl + 'Auth/GetAllOwners')
  }

  // ************************************ Units ************************************

  // add unit
  addUnit(unit: Unit): Observable<Unit>{
    return this._HttpClient.post<Unit>(this.apiUrl + 'Unit/Create', unit)
  }

  // get all units
  getUnits(): Observable<Unit[]>{
    return this._HttpClient.get<Unit[]>(this.apiUrl + 'Unit/GetAll')
  }

}
