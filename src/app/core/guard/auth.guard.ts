import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _Router: Router, private _ToastrService: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      let token = localStorage.getItem('qrToken')
      if (!token) {
        this._Router.navigate(['/login'])
        this._ToastrService.error('🤪 عليك تسجيل الدخول')
        return false
      }
      return true;
  }

}
