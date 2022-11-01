import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

import { Reservation } from './../../../shared/models/reservation';
import { User } from './../../../shared/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  reservations: Reservation[] = []
  user: User
  pReservation: number = 1;
  totalReservation: any = 0

  constructor(private  _ReservationService: ReservationService, private _UserService: UserService, private _ToastrService: ToastrService, private _DatePipe: DatePipe) { }

  userName = localStorage.getItem('qrLoginUser')
  userId = localStorage.getItem('qrIdUser')
  myDate: string;
  counts: any

  ngOnInit(): void {
    this.myDate = this._DatePipe.transform(new Date(), 'yyyy-MM-dd');

    // call function
    this.getReservation()
    this.getUser()
    this.getDashboardCount()
  }

  // get reservation
  getReservation(){
    this._ReservationService.getReservations().subscribe({
      next: (reservation) => {
        this.reservations = reservation
      },
      error: (error) => {
        this._ToastrService.warning('🤪 حدث خطأ')
      }
    })
  }

  // get all users
  getUser(){
    this._UserService.getUser(this.userId).subscribe({
      next: (user) => {
        this.user = user
      },
      error: (error) => {
        this._ToastrService.warning('🤪 حدث خطأ')
      }
    })
  }

  // get dashboard count
  getDashboardCount(){
    this._UserService.getDashboardCount().subscribe({
      next: (counts) => {
        this.counts = counts
      },
      error: (error) => {
        this._ToastrService.warning('🤪 حدث خطأ')
      }
    })
  }

}
