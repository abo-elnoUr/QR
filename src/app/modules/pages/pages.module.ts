import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../../shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LayoutModule } from '../layout/layout.module';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { InvititionComponent } from './invitition/invitition.component';
import { AccountComponent } from './account/account.component';





@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    SettingComponent,
    ProfileComponent,
    InvititionComponent,
    AccountComponent
  ],
  imports: [
  CommonModule,
  HttpClientModule,
  SharedModule,
  PagesRoutingModule,
  LayoutModule
  ]
})
export class PagesModule { }
