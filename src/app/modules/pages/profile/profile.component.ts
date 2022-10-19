import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: any = ''
  fname: any = ''
  lname: any = ''
  file: any = null
  profileimage: string = ''
  fileImage: any = ""
  id: any = null

  constructor(public _UserService: UserService, private _ToastrService: ToastrService, private _Router: Router) { }

  profileForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    username: new FormControl(''),
    phone: new FormControl(''),
  });

  ngOnInit(): void {
  }

}
