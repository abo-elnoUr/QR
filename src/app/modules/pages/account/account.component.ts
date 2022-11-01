import { Component, OnInit } from '@angular/core';

import { OwnerRegisterService } from 'src/app/shared/services/owner-register.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterOrder } from 'src/app/shared/models/registerOrder';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  statusValue: string = 'غير مفعل'
  registerOrders: RegisterOrder[] = []
  pAccount: number = 1;
  totalAccount: any = 0
  imgUrl: string = 'http://192.168.1.254:5214/'
  imgPath: any
  pendingAccount: number = 0
  approvedAccount: number = 0
  rejectedOwners: number = 0
  state = {
    id: 0,
    switch: true
  }


  constructor(private _OwnerRegisterService: OwnerRegisterService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    // call functions
    this.getRegisterationOrders()
    this.getOwnerCount()
  }

  // pagination
  pageChangedAccount(num: any) {
    this.pAccount = num
    this.getRegisterationOrders()
  }

  // get all owners count
  getOwnerCount(){
    this._OwnerRegisterService.getOwnerCount().subscribe({
      next: (count) => {
        this.pendingAccount = count.pendingCount
        this.approvedAccount = count.approvedCount
        this.rejectedOwners = count.rejectedOwners
      },
      error: (error) => {
        this._ToastrService.warning('😭 حدث خطأ')
      }
    })
  }


  switchStatus(ele: any, id: number){
    if (ele.target.checked == true) {
      this.statusValue = 'مفعل'
      this.state.id = id
      this.state.switch = true
      this._OwnerRegisterService.switchStatus(this.state).subscribe({
        next: (switching) => {
          this._ToastrService.success('😁 تم تفعيل الحساب')
          this.getOwnerCount()
        },
        error: (error) => {
          this._ToastrService.error('😭 حدث خطأ')
        }
      })
    } else {
      this.statusValue = 'غير مفعل'
      this.state.id = id
      this.state.switch = false
      this._OwnerRegisterService.switchStatus(this.state).subscribe({
        next: (switching) => {
          this._ToastrService.info('😒 تم إلغاء تفعيل الحساب')
          this.getOwnerCount()
        },
        error: (error) => {
          this._ToastrService.error('😭 حدث خطأ')
        }
      })
    }
  }

  // get all order register orders
  getRegisterationOrders(){
    this._OwnerRegisterService.getRegisterationOrders().subscribe({
      next: (registerOrder) => {
        this.registerOrders = registerOrder
        if(registerOrder[0].switch == true){
          this.statusValue = 'مفعل'
        }else{
          this.statusValue = 'غير مفعل'
        }
      },
      error: (error) => {
        this._ToastrService.warning('😭 حدث خطأ')
      }
    })
  }

  viewImage(img: string){
    this.imgPath = img
  }

  // delete account
  deleteOwner(id: number){
    this._OwnerRegisterService.deleteAccount(id).subscribe({
      next: (deleted) => {
        this._ToastrService.error('😭 تم مسح طلب التسجيل')
        this.getRegisterationOrders()
        this.getOwnerCount()
      },
      error: (error) => {
        this._ToastrService.error('😭 حدث خطأ')
      }
    })
  }

}
