import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { RegisterOrder } from '../models/registerOrder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnerRegisterService {

  /// apiUrl = environment.algoritmUrl
  // apiUrl = environment.smarterUrl
  apiUrl = environment.localUrl


  constructor(private _HttpClient: HttpClient) { }

  // ************************************ Owners ************************************

  // get all registeration order
  getRegisterationOrders(): Observable<RegisterOrder[]> {
    return this._HttpClient.get<RegisterOrder[]>(this.apiUrl + 'Auth/GetAllOwners')
  }

  // get owner count
  getOwnerCount(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'Auth/GetOwnersCount')
  }

  // switch owner status
  switchStatus(state: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'Auth/SwitchOwner', state)
  }

  // delete account
  deleteAccount(id: number): Observable<RegisterOrder> {
    return this._HttpClient.get<RegisterOrder>(this.apiUrl + `Auth/RejectOwner/${id}`)
  }

}
