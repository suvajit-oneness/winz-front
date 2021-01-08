import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EncodeDecodeBase64 } from 'src/globalFunction';
import { ActivatedRoute } from '@angular/router';
import   Swal from 'sweetalert2';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  public EncodeDecodeBase64 = EncodeDecodeBase64;

  public courseDetails : any = [];
  constructor(private _api:APIService,private _loader : NgxUiLoaderService,private _activatedRoute:ActivatedRoute) {}
  public loginCheck = false;public userInfo :any = {};
  public courseId : any = 0;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loginCheck = this._api.isAuthenticated();
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.courseId = EncodeDecodeBase64(this._activatedRoute.snapshot.paramMap.get('courseId'),'decode');
    this.getCourseDetails(this.courseId); // calling to get the Teacher Info
  }

  /*********Get Course List *********/
  getCourseDetails(courseId){
    this._loader.startLoader('loader');
    this._api.getCourseDetails(courseId).subscribe(
        res => {
          this.courseDetails = res.data;
          // console.log(this.courseDetails);
          this._loader.stopLoader('loader');
        },err => {}
    )
  }

  enrollNow(){
    if(this.loginCheck){

    }else{
      Swal.fire('Error','Please login to countinue','error')
    }
  }

}
