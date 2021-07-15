import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EncodeDecodeBase64 } from 'src/globalFunction';
import { ActivatedRoute, Router } from '@angular/router';
import   Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  public EncodeDecodeBase64 = EncodeDecodeBase64;

  public courseDetails : any = [];
  constructor(private _api:APIService,private _loader : NgxUiLoaderService,
    private _activatedRoute:ActivatedRoute,
    private _router: Router
  ) {}
  public loginCheck = false;public userInfo :any = {};
  public courseId : any = 0;public userId : any = 0;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loginCheck = this._api.isAuthenticated();
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.userId = (this.loginCheck) ? this.userInfo.id : 0;
    this.courseId = EncodeDecodeBase64(this._activatedRoute.snapshot.paramMap.get('courseId'),'decode');
    this.getCourseDetails(this.courseId); // calling to get the Teacher Info
  }

  /*********Get Course List *********/
  getCourseDetails(courseId){
    this._loader.startLoader('loader');
    this._router.navigateByUrl('/course-details/'+EncodeDecodeBase64(courseId,'encode'));
    this._api.getCourseDetails(courseId,this.userId).subscribe(
        res => {
          this.courseDetails = res.data;
          window.scrollTo(0, 0);
          this._loader.stopLoader('loader');
        },err => {}
    )
  }

  public lectureTitle = '';public youtubeURL = 'https://www.youtube.com/embed/tgbNymZ7vqY';
  public playAsYoutube(lectureDetails){
    this.lectureTitle = lectureDetails.title+' : '+lectureDetails.description;
    if(lectureDetails.media != ''){
      this.youtubeURL = lectureDetails.media;
    }
    $('#youtubeModalBody').empty().append('<iframe width="420" height="345" src="'+this.youtubeURL+'"></iframe>');
    $('.youtubeModal').trigger('click');
  }

  closeYoutubeModal(){
    $('#youtubeModalBody').empty();
  }

  enrollNow(whattodo,data){
    if(this.loginCheck){
      const mainForm = new FormData();
      mainForm.append('userId',this.userInfo.id);
      mainForm.append('whatPurchased',whattodo);
      if(whattodo == 'chapter'){
        mainForm.append('courseId',data.courseId);
        mainForm.append('chapterId',data.id);
      }else if(whattodo == 'course'){
        mainForm.append('courseId',data.id);
      }
      this._loader.startLoader('loader');
      this._api.postUserSubscribedCourse(mainForm).subscribe(
        res => {
          if(res.error == false){
            this._router.navigateByUrl('/user/subscription/thankyou/'+EncodeDecodeBase64(res.data.id,'encode'));
          }else{
            Swal.fire('Error',res.message);
          }
          this._loader.stopLoader('loader');
          // console.log(res);
        },err => {}
      )
    }else{
      Swal.fire('Error','Please login to countinue','error')
    }
  }

  alreadyEnrolled(){
    Swal.fire('Warning','This course is already enrolled by you');
  }

}
