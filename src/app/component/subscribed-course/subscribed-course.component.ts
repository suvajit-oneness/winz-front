import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-subscribed-course',
  templateUrl: './subscribed-course.component.html',
  styleUrls: ['./subscribed-course.component.css']
})
export class SubscribedCourseComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {
    this._loader.startLoader('loader');
  }
  public subscribedCourses : any = [];public userInfo :any = {};
  ngOnInit(): void {
    this.userInfo = this._api.getUserDetailsFromStorage();
    this._loader.stopLoader('loader');
    this.getSubscribedCourses(1);
  }

  getSubscribedCourses(userId = this.userInfo.id){
    this._loader.startLoader('loader');
    this._api.getUserSubscribedCourses(userId).subscribe(
      res => {
        this.subscribedCourses = res.data;
        this._loader.stopLoader('loader');
      },err => {}
    )
  }

}
