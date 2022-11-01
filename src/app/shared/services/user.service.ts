import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Owner } from './../models/owner';
import { Unit } from '../models/unit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // apiUrl = environment.algoritmUrl
  // apiUrl = environment.smarterUrl
  apiUrl = environment.localUrl


  constructor(private _HttpClient: HttpClient) { }

  // ************************************ Users ************************************

  // create user
  addUser(register: any): Observable<User> {
    return this._HttpClient.post<User>(this.apiUrl + 'Auth/Register', register)
  }

  // get all users
  getUsers(): Observable<User[]> {
    return this._HttpClient.get<User[]>(this.apiUrl + 'Auth/GetAllUsers')
  }

  // get user by id
  getUser(id: string): Observable<User> {
    return this._HttpClient.get<User>(this.apiUrl + `Auth/GetUserById/${id}`)
  }

  // update user
  updateUser(user: User, id: string): Observable<User> {
    return this._HttpClient.put<User>(this.apiUrl + `Auth/UpdateUser/${id}`, user)
  }

  // ************************************ Owners ************************************

  // get all owners
  getOwners(): Observable<Owner[]> {
    return this._HttpClient.get<Owner[]>(this.apiUrl + 'Auth/GetAllOwners')
  }


  // ************************************ Units ************************************

  // add unit
  addUnit(unit: Unit): Observable<Unit> {
    return this._HttpClient.post<Unit>(this.apiUrl + 'Unit/Create', unit)
  }

  // get all units
  getUnits(): Observable<Unit[]> {
    return this._HttpClient.get<Unit[]>(this.apiUrl + 'Unit/GetAll')
  }

  // get unit by id
  getUnit(id: any): Observable<Unit> {
    return this._HttpClient.get<Unit>(this.apiUrl + `Unit/GetUnitById/${id}`)
  }

  // update unit
  updateUnit(unit: Unit, id: any): Observable<Unit> {
    return this._HttpClient.put<Unit>(this.apiUrl + `Unit/Update/${id}`, unit)
  }

  // delete unit
  deleteUnit(id: any): Observable<Unit> {
    return this._HttpClient.delete<Unit>(this.apiUrl + `Unit/Delete/${id}`)
  }

  // ************************************ Dashboard ************************************

  // get all count
  getDashboardCount(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'Dashboard/GetCount')
  }


}
