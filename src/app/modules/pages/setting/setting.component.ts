import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  addUserForm: FormGroup
  editUserForm: FormGroup

  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder, private _ToastrService: ToastrService, private _Router: Router) { }


  ngOnInit(): void {
    this.addUserForm = this._FormBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      address: ['', [
        Validators.required
      ]],
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      type: ['user', [
        Validators.required,
      ]],
      phone: ['', [
        Validators.required,
        Validators.minLength(11)
      ]],
      userName: ['', [
        Validators.required,
      ]]
    })
    this.editUserForm = this._FormBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      address: ['', [
        Validators.required
      ]],
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      type: ['user', [
        Validators.required,
      ]],
      phone: ['', [
        Validators.required,
        Validators.minLength(11)
      ]],
      userName: ['', [
        Validators.required,
      ]]
    })
  }

  addUser() {
    this.addUserForm.get('type').setValue('user')
    const createForm = new FormData()
    createForm.append('firstName', this.addUserForm.get('firstName').value)
    createForm.append('lastName', this.addUserForm.get('lastName').value)
    createForm.append('address', this.addUserForm.get('address').value)
    createForm.append('email', this.addUserForm.get('email').value)
    createForm.append('password', this.addUserForm.get('password').value)
    createForm.append('confirmPassword', this.addUserForm.get('confirmPassword').value)
    createForm.append('phone', this.addUserForm.get('phone').value)
    createForm.append('userName', this.addUserForm.get('userName').value)
    createForm.append('type', this.addUserForm.get('type').value)
    this._AuthService.register(createForm).subscribe({
      next: (register) => {
        this._ToastrService.success('💛 تم تسجيل مستخدم جديد  ')
        this.addUserForm.reset()
      },
      error: (error) => {
        console.log(error);

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


  // edit user
  editUser() {

  }

}
