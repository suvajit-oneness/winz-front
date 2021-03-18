import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService) { }

  ngOnInit(): void {
    this._loader.startLoader('loader');
    this._loader.stopLoader('loader');
  }

}
