import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token = localStorage.getItem('qrToken')
  loginForm: FormGroup
  forgetForm: FormGroup

  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder, private _Router: Router, private _ToastrService: ToastrService) {
    if (this.token) {
      this._Router.navigate(['/dashboard/home'])
    }
   }



  ngOnInit(): void {
    this.loginForm = this._FormBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    })

    this.forgetForm = this._FormBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
    })
  }

  // login

  onLogin(){
    this._AuthService.login(this.loginForm.value).subscribe({
      next: (login) => {
        this._ToastrService.success('💛 تم تسجيل الدخول بنجاح ')
        this._AuthService.isLogin = true
        localStorage.setItem('qrToken', login.token)
        localStorage.setItem('qrIdUser', login.id)
        localStorage.setItem('qrLoginUser', login.name)
        localStorage.setItem('qrRole', login.type)
        this._Router.navigate(['/dashboard/home'])
        this.loginForm.reset()
      },
      error: (error) => {
        switch (error.status) {
          case 500:
            this._ToastrService.error(error.error.message as string);
            break
          case 401:
            for (const [key, value] of Object.entries(error.error.message)) {
              this._ToastrService.error(value as string);
            }
            break
          case 400:
            for (const [key, value] of Object.entries(error.error.message)) {
              this._ToastrService.error(value as string);
            }
            break
        }
      }
    })
  }

  // forget password
  forgetPassword(){
    this._AuthService.forgetPassword(this.forgetForm.value).subscribe({
      next: (send) => {
        this._ToastrService.success(' 😊 تم ارسال الايميل يرجي مراجعة البريد')
        this.forgetForm.reset()
        localStorage.setItem('forgetToken', send.token)
        localStorage.setItem('forgetEmail', send.email)
        this._Router.navigate(['/resetPassword'])
      },
      error: (error) => {
        switch (error.status) {
          case 500:
            this._ToastrService.error(error.error.message as string);
            break
          case 401:
            for (const [key, value] of Object.entries(error.error.message)) {
              this._ToastrService.error(value as string);
            }
            break
          case 400:
            for (const [key, value] of Object.entries(error.error.message)) {
              this._ToastrService.error(value as string);
            }
            break
        }
      }
    })
  }


}
