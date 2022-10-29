import { Component, OnInit } from '@angular/core';

import { ReservationService } from 'src/app/shared/services/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from './../../../shared/models/reservation';

@Component({
  selector: 'app-invitition',
  templateUrl: './invitition.component.html',
  styleUrls: ['./invitition.component.scss']
})
export class InvititionComponent implements OnInit {

  reservations: Reservation[] = []
  pReversation: number = 1;
  totalReversation: any = 0

  constructor(private _ReservationService: ReservationService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    // call functions
    this.getReservations()
  }

  // pagination
  pageChangedReveration(num: any) {
    this.pReversation = num
    this.getReservations()
  }

  // get all reservation
  getReservations(){
    this._ReservationService.getReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations
      },
      error: (error) => {
        this._ToastrService.warning('😭 حدث خطأ')
      }
    })
  }
}
