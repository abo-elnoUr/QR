import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  token = localStorage.getItem('token')
  loginUser = localStorage.getItem('loginUser')

  constructor(public _AuthService: AuthService, private _Router: Router, private _ThemeService: ThemeService) { }

  ngOnInit(): void {
    if (this.token) {
      this._AuthService.isLogin = true
    } else {
      this._AuthService.isLogin = false
    }
  }

  public switchTheme(): void {
    if (this._ThemeService.current === 'light') {
      this._ThemeService.current = 'dark';
    } else {
      this._ThemeService.current = 'light';
    }
  }

  logout() {
    this._AuthService.isLogin = false
    localStorage.removeItem('token')
    localStorage.removeItem('idUser')
    localStorage.removeItem('loginUser')
    localStorage.removeItem('role')
    this._Router.navigate(['/login'])
  }

}
