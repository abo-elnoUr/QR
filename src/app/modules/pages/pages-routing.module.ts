import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../../core/guard/auth.guard';
import { AdminGuard } from 'src/app/core/guard/admin.guard';

import { MainComponent } from '../layout/main/main.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { InvititionComponent } from './invitition/invitition.component';
import { AccountComponent } from './account/account.component';
import { UserComponent } from './setting/user/user.component';
import { UnitComponent } from './setting/unit/unit.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'setting', component: SettingComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'unit', component: UnitComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'invitition', component: InvititionComponent, canActivate: [AuthGuard] },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
