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
  pReversation: number = 1
  totalReversation: any = 0
  reservation: Reservation
  searchTxt: string = ''

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
  getReservations() {
    this._ReservationService.getReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations
      },
      error: (error) => {
        this._ToastrService.warning('😭 حدث خطأ')
        switch (error.status) {
          case 500:
            this._ToastrService.error(error.error.errors as string);
            break
          case 401:
            for (const [key, value] of Object.entries(error.error.errors)) {
              this._ToastrService.error(value as string);
            }
            break
          case 400:
            for (const [key, value] of Object.entries(error.error.errors)) {
              this._ToastrService.error(value as string);
            }
            break
        }
      }
    })
  }

  // get reservation
  getReservation(id: number) {
    this._ReservationService.getReservation(id).subscribe({
      next: (reseve) => {
        this.reservation = reseve
      },
      error: (error) => {
        this._ToastrService.error('😥 حدث خطأ')

      }
    })
  }

  onSearch(event: any){
    this.searchTxt = event.target.value
    console.log(event.target.value);

  }

  // search
  searchInreservation(){
    this._ReservationService.searchInreservation(this.searchTxt).subscribe({
      next: (search) => {
        this.reservations = search
      }
    })
  }

}
