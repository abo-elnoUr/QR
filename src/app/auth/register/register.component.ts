import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder, private _ToastrService: ToastrService, private _Router: Router) { }


  ngOnInit(): void {
    this.registerForm = this._FormBuilder.group({
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

  onRegister(){
    this.registerForm.get('type').setValue('user')
    this._AuthService.register(this.registerForm.value).subscribe({
      next: (register) => {
        this._ToastrService.success('register succesfully 💛')
        this.registerForm.reset()
        this._Router.navigate(['/login'])
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

}
