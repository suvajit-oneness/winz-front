import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _api:APIService) { }

  public courseList : any = [];
  public teacherList : any = [];

  ngOnInit(): void {
    this.getCourseList();
    this.getTeacherList();
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
