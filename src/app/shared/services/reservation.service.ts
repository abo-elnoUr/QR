import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // apiUrl = environment.algoritmUrl
  // apiUrl = environment.smarterUrl
  apiUrl = environment.localUrl

  constructor(private _HttpClient: HttpClient) { }

  // ************************************ Reservations ************************************

  // get all reservation
  getReservations(): Observable<Reservation[]> {
    return this._HttpClient.get<Reservation[]>(this.apiUrl + 'Invitation/GetAllInvitationDaily')
  }

  // get reservation by id
  getReservation(id: number): Observable<Reservation> {
    return this._HttpClient.get<Reservation>(this.apiUrl + `Invitation/GetInvitationById/${id}`)
  }

  // search in reservation
  searchInreservation(search: any): Observable<Reservation[]> {
    return this._HttpClient.post<Reservation[]>(this.apiUrl + 'Invitation/SearchInvitation', { "searchText": search })
  }

}
