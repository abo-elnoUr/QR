import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor() { }
  statusValue: string = 'غير مفعل'

  ngOnInit(): void {
  }

  doSomeThing(ele: any){
    if (ele.target.checked == true) {
      this.statusValue = 'مفعل'
    } else {
      this.statusValue = 'غير مفعل'
    }
  }

}
