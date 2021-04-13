import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EncodeDecodeBase64 } from 'src/globalFunction';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  public EncodeDecodeBase64 = EncodeDecodeBase64;
  public teacherList = [];
  constructor(private _api:APIService,private _loader : NgxUiLoaderService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getTeacherList();
  }

  getTeacherList(){
      this._loader.startLoader('loader');
      this._api.getTeacherList().subscribe(
          res => {
              this.teacherList = res.data;
              this._loader.stopLoader('loader');
              // console.log(this.teacherList);
          },err => {
              this._loader.stopLoader('loader');
          }
      )
  }
}


