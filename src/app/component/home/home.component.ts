import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _api:APIService,
    private _loader : NgxUiLoaderService
  ) {
    this._loader.startLoader('loader');
  }

  public courseList : any = [];
  public teacherList : any = [];

  ngOnInit(): void {
    this.getCourseList();
    this.getTeacherList();
    this._loader.stopLoader('loader');
  }
  /*********Get Course List *********/
  getCourseList(){
    this._api.getCourseList().subscribe(
        res => {
          this.courseList = res.data;
          console.log(this.courseList);
        },err => {}
    )
  }

  /*********Get Teacher List *********/
  getTeacherList(){
      this._api.getTeacherList().subscribe(
          res => {
            this.teacherList = res.data;
            // console.log(this.teacherList);
          },err => {}
      )
  }

}
