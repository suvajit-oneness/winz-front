import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public courseList : any = [];
  constructor(private _api:APIService) { }

  ngOnInit(): void {
    this.getCourseList();
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

}
