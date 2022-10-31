import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  addUserForm: FormGroup;
  editUserForm: FormGroup;
  users: User[] = []
  userId: string = ''
  id: any = null
  pUsers: number = 1;
  totalUsers: any = 0

  constructor(private _AuthService: AuthService, private _UserService: UserService, private _FormBuilder: FormBuilder, private _ToastrService: ToastrService, private _Router: Router) { }


  ngOnInit(): void {

    // call functions
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
        Validators.email
      ]],
      address: ['', [
      ]],
      firstName: ['', [
      ]],
      lastName: ['', [
      ]],
      password: ['', [
        Validators.minLength(6)
      ]],
      confirmPassword: ['', [
        Validators.minLength(6)
      ]],
      type: ['user', [
      ]],
      phone: ['', [
        Validators.minLength(11)
      ]],
      userName: ['', [
      ]]
    })

  }

   // pagination
   pageChangedUsers(num: any) {
    this.pUsers = num
    this.getUsers()
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
        this.userId = user.id
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
    this._UserService.updateUser(this.editUserForm.value, this.userId).subscribe({
      next: (next) => {
        this._ToastrService.info('👏 تم التعديل ')
        this.editUserForm.reset()
        this.getUsers()
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

  // delete user
  deleteUser(id: string) {

  }


}
