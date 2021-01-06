import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  public courseList : any = [];
  constructor(private _api:APIService,private _loader : NgxUiLoaderService) {

  }
  
  ngOnInit(): void {
    this.getCourseList();
  }

  /*********Get Course List *********/
  getCourseList(){
    this._loader.startLoader('loader');
    this._api.getCourseList().subscribe(
        res => {
          this.courseList = res.data;
          this._loader.stopLoader('loader');
        },err => {}
    )
  }

}
