import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _Router: Router, private _ToastrService: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
      let role = localStorage.getItem('qrRole')
      if (role != 'admin') {
        this._Router.navigate(['/dashboard/home'])
        this._ToastrService.error('🤪 ليس لديك صلاحيه')
        return false
      }
      return true;
  }

}
