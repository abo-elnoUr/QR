import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Unit } from 'src/app/shared/models/unit';
import { User } from './../../../shared/models/user';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  addUserForm: FormGroup;
  editUserForm: FormGroup;
  addUnitForm: FormGroup;
  editUnitForm: FormGroup;
  units: Unit[] = []
  users: User[] = []
  unitId: any
  id: any = null
  p: number = 1;
  total: any = 0
  pUsers: number = 1;
  totalUsers: any = 0

  constructor(private _AuthService: AuthService, private _UserService: UserService, private _FormBuilder: FormBuilder, private _ToastrService: ToastrService, private _Router: Router) { }


  ngOnInit(): void {

    // call functions
    this.getUnits()
    this.getUsers()


    // forms init

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
    this.addUnitForm = this._FormBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      phone: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    })
    this.editUnitForm = this._FormBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      phone: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    })
  }

  // pagination
  pageChanged(num: any) {
    this.p = num
    this.getUnits()
  }

  // pagination
  pageChangedUsers(num: any) {
    this.pUsers = num
    this.getUnits()
  }

  // ************************* Users ****************************

  //  get all users
  getUsers() {
    this._UserService.getUsers().subscribe({
      next: (users) => {
        this.users = users
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
    this._UserService.addUser(createForm).subscribe({
      next: (register) => {
        this._ToastrService.success('💛 تم تسجيل مستخدم جديد  ')
        this.addUserForm.reset()
        this.getUsers()
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

  // get user by id
  getUser(id: string) {
    this._UserService.getUser(id).subscribe({
      next: (user) => {
        this.editUserForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          phone: user.phone,
          address: user.address,
          email: user.email
        })
      }
    })
  }


  // edit user
  editUser() {

  }

  // delete user
  deleteUser(id: string) {

  }

  // ************************* owners ****************************

  // add unit
  addUnit() {
    this._UserService.addUnit(this.addUnitForm.value).subscribe({
      next: (added) => {
        this._ToastrService.success('💛 تم إضافة وحدة جديدة ')
        this.addUnitForm.reset()
        this.getUnits()
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

  // get all units
  getUnits() {
    this._UserService.getUnits().subscribe({
      next: (units) => {
        this.units = units
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

  // get unit by id
  getUnit(id: any) {
    this._UserService.getUnit(id).subscribe({
      next: (unit) => {
        this.unitId = unit.id
        this.editUnitForm.patchValue({
          name: unit.name,
          phone: unit.phone,
        })
      },
      error: (error) => {
        this._ToastrService.error('😭 حدث خطأ ');
      }
    })
  }

  // edit unit
  editUnit() {
    this._UserService.updateUnit(this.editUnitForm.value, this.unitId).subscribe({
      next: (updated) => {
        this._ToastrService.info('👏 تم التعديل ')
        this.editUnitForm.reset()
        this.getUnits()
      },
      error: (error) => {
        switch (error.status) {
          case 500:
            this._ToastrService.error(error.error.message as string);
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

  // delete unit
  deleteUnit(id: any) {
    this._UserService.deleteUnit(id).subscribe({
      next: (next) => {
        this._ToastrService.error('😭 تم الحذف ')
        this.getUnits()
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
