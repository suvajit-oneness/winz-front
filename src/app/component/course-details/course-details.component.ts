import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

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
