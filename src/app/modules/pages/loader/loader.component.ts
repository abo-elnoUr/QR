import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(private _LoaderService: LoaderService) { }

  isLoading: Observable<boolean> = this._LoaderService.getLoading()

  ngOnInit(): void {
  }

}
