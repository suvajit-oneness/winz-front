import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public courseList : any = [];
  constructor(private _api:APIService,private _loader : NgxUiLoaderService) {
    
  }
  ngOnInit(): void {
    this.getCourseList();
    window.scrollTo(0, 0);
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
