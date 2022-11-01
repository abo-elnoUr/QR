import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './../../../shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userId = localStorage.getItem('qrIdUser')

  user: User
  enableFlag: boolean = true

  constructor(public _UserService: UserService, private _ToastrService: ToastrService, private _Router: Router) { }

  profileForm = new FormGroup({
    firstName: new FormControl({value: '', disabled: true}),
    lastName: new FormControl({value: '', disabled: true}),
    userName: new FormControl({value: '', disabled: true}),
    phone: new FormControl({value: '', disabled: true}),
    password: new FormControl({value: '', disabled: true}),
    confirmPassword: new FormControl({value: '', disabled: true}),
  });

  ngOnInit(): void {
    // call function
    this.getUser()
  }

  getUser(){
    this._UserService.getUser(this.userId).subscribe({
      next: (user) => {
        this.user = user
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          phone: user.phone,
        })
      },
      error: (error) => {
        this._ToastrService.warning('🤪 حدث خطأ ')
      }
    })
  }


  enableEdit(){
    this.profileForm.get('firstName').enable()
    this.profileForm.get('lastName').enable()
    this.profileForm.get('userName').enable()
    this.profileForm.get('phone').enable()
    this.profileForm.get('password').enable()
    this.profileForm.get('confirmPassword').enable()
    this.enableFlag = false
  }

  editUser(){
    this.enableFlag = true
    this.profileForm.get('firstName').disable()
    this.profileForm.get('lastName').disable()
    this.profileForm.get('userName').disable()
    this.profileForm.get('phone').disable()
    this.profileForm.get('password').disable()
    this.profileForm.get('confirmPassword').disable()

    this._UserService.updateUser(this.profileForm.value, this.userId).subscribe({
      next: (updtaed) => {
        this._ToastrService.info('👏 تم التعديل')
      },
      error: (error) => {
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

}
