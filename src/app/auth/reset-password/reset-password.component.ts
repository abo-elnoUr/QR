import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup

  constructor(private _FormBuilder: FormBuilder, private _Router: Router) { }

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
  onConfirm(){

  }

}
