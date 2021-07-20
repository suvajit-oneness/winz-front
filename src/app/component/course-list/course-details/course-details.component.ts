import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EncodeDecodeBase64 } from 'src/globalFunction';
import { ActivatedRoute, Router } from '@angular/router';
import   Swal from 'sweetalert2';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';

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
    this.loadStripe();
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

  totalPrice : any = 0;
  enrollNow(whattodo,data){
    if(this.loginCheck){
      if(whattodo == 'chapter'){
        this.totalPrice = data.price
      }else if(whattodo == 'course'){
        this.totalPrice = data.coursePrice;
      }
      var handler = (<any>window).StripeCheckout.configure({
        key: this.stripeKey,
        locale: 'auto',
        token: (token: any) => {
          this.createStripeCharge(token,whattodo,data);
        }
      });
      handler.open({
        name: 'Winz',
        amount: parseFloat(this.totalPrice) * 100,
      });
    }else{
      Swal.fire('Error','Please login to countinue','error')
    }
  }

  alreadyEnrolled(){
    Swal.fire('Warning','This course is already enrolled by you');
  }

  // Stripe Integration Start
  public handler:any = null;
  public stripeKey = environment.stripeKey;
  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: this.stripeKey,
          locale: 'auto',
          token: function (token: any) {
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }

  createStripeCharge(token,whattodo,data){
    this._loader.startLoader('loader');
    const mainForm = new FormData();
    mainForm.append('stripeToken',token.id);
    mainForm.append('amount',this.totalPrice);
    this._api.createStripeTokenCharge(mainForm).subscribe(
      res => {
        if(res.error == false){
          this.purchaseConfirmed(res.data,whattodo,data);
        }else{
          Swal.fire('Error', res.message);
        }
        // console.log('Response After Payment',res);
        this._loader.stopLoader('loader');
      },
      err => {
        this._loader.stopLoader('loader');
        Swal.fire('Error', 'Something Went Wrong Please try after Some time');
      }
    );
  }

  purchaseConfirmed(transactionDetails,whattodo,purchaseData){
      const mainForm = new FormData();
      mainForm.append('stripeTransactionId',transactionDetails.id);
      mainForm.append('userId',this.userInfo.id);
      mainForm.append('whatPurchased',whattodo);
      if(whattodo == 'chapter'){
        mainForm.append('courseId',purchaseData.courseId);
        mainForm.append('chapterId',purchaseData.id);
      }else if(whattodo == 'course'){
        mainForm.append('courseId',purchaseData.id);
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
        },err => {}
      )
  }

}
