import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BodyComponent } from './body/body.component';



@NgModule({
  declarations: [
    NavbarComponent,
    MainComponent,
    SideBarComponent,
    BodyComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LayoutModule { }
