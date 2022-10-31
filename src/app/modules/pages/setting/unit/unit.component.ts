import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Unit } from 'src/app/shared/models/unit';


@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {

  addUnitForm: FormGroup;
  editUnitForm: FormGroup;
  units: Unit[] = []
  unitId: any
  id: any = null
  p: number = 1;
  total: any = 0

  constructor(private _AuthService: AuthService, private _UserService: UserService, private _FormBuilder: FormBuilder, private _ToastrService: ToastrService, private _Router: Router) { }

  ngOnInit(): void {

    // call functions
    this.getUnits()


    // forms init
    this.addUnitForm = this._FormBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      phone: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    })
    this.editUnitForm = this._FormBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      phone: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    })
  }

  // pagination
  pageChanged(num: any) {
    this.p = num
    this.getUnits()
  }


  // add unit
  addUnit() {
    this._UserService.addUnit(this.addUnitForm.value).subscribe({
      next: (added) => {
        this._ToastrService.success('💛 تم إضافة وحدة جديدة ')
        this.addUnitForm.reset()
        this.getUnits()
      },
      error: (error) => {
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

  // get all units
  getUnits() {
    this._UserService.getUnits().subscribe({
      next: (units) => {
        this.units = units
      },
      error: (error) => {
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

  // get unit by id
  getUnit(id: any) {
    this._UserService.getUnit(id).subscribe({
      next: (unit) => {
        this.unitId = unit.id
        this.editUnitForm.patchValue({
          name: unit.name,
          phone: unit.phone,
        })
      },
      error: (error) => {
        this._ToastrService.error('😭 حدث خطأ ');
      }
    })
  }

  // edit unit
  editUnit() {
    this._UserService.updateUnit(this.editUnitForm.value, this.unitId).subscribe({
      next: (updated) => {
        this._ToastrService.info('👏 تم التعديل ')
        this.editUnitForm.reset()
        this.getUnits()
      },
      error: (error) => {
        switch (error.status) {
          case 500:
            this._ToastrService.error(error.error.message as string);
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

  // delete unit
  deleteUnit(id: any) {
    this._UserService.deleteUnit(id).subscribe({
      next: (next) => {
        this._ToastrService.error('😭 تم الحذف ')
        this.getUnits()
      },
      error: (error) => {
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
