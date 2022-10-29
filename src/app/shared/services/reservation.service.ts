import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  apiUrl = 'http://192.168.1.254:5214/api/'

  constructor(private _HttpClient: HttpClient) { }

  // ************************************ Reservations ************************************

  // get all reservation
  getReservations(): Observable<Reservation[]>{
    return this._HttpClient.get<Reservation[]>(this.apiUrl + 'Invitation/GetAll')
  }

}
