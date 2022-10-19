import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  constructor(private _DatePipe: DatePipe) { }

  userName = localStorage.getItem('loginUser')
  myDate: string;

  ngOnInit(): void {
    this.myDate = this._DatePipe.transform(new Date(), 'yyyy-MM-dd');
  }

}
