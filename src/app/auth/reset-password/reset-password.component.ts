import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup

  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.resetPasswordForm = this._FormBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      token: ['', [
        Validators.required,
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
    })
  }

  // reset password
  onConfirm() {
    this._AuthService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (reset) => {
        this._ToastrService.success('👌 تم تغير الرقم السري بنجاح ')
        this.resetPasswordForm.reset()
        localStorage.removeItem('forgetToken')
        localStorage.removeItem('forgetEmail')
        this._Router.navigate(['/login'])
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
