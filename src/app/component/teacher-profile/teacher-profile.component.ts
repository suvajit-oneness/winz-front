import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService) {
    this._loader.startLoader('loader');
  }

  ngOnInit(): void {
    this._loader.stopLoader('loader');
  }

}
