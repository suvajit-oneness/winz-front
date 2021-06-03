import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import { EncodeDecodeBase64 } from 'src/globalFunction';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  public EncodeDecodeBase64 = EncodeDecodeBase64;
  constructor(private _loader : NgxUiLoaderService,private _activatedRoute:ActivatedRoute,private _api:APIService,private _router:Router) {
    this._loader.startLoader('loader');
  }

  public subjectCategoryId;
  public chapterList : any = [];

  public categoryName=''; public subjectCategoryName = '';

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._loader.stopLoader('loader');
    this.subjectCategoryId = EncodeDecodeBase64(this._activatedRoute.snapshot.paramMap.get('subjectCategoryId'),'decode');
    this.getChapters(this.subjectCategoryId);

    this.loadStripe(); // loading the Stripe Payment
  }

  getChapters(subjectCategoryId=0,chapter=0){
    this._loader.startLoader('loader');
    this._api.getChapterList(subjectCategoryId,chapter).subscribe(
      res => {
        this.chapterList = res.data;
        Object.keys(res.data).forEach((key)=>{
          this.categoryName = res.data[key].category.full_name;
          this.subjectCategoryName = res.data[key].subject_category.title;
        });
        console.log(this.chapterList);
      },err => {}
    )
    this._loader.stopLoader('loader');
  }

  buyNowChapter(chapterDetails){
    let login = this._api.isAuthenticated();
    if(login){
      var handler = (<any>window).StripeCheckout.configure({
        key: this.stripeKey,
        locale: 'auto',
        token: (token: any) => {
          this.createStripeCharge(token,chapterDetails);
        }
      });
      handler.open({
        name: 'Winz',
        amount: parseFloat(chapterDetails.price) * 100,
      });
    }else{
      // let currentPath = this._router.url;
      // localStorage.setItem('routeIntended',currentPath);
      Swal.fire('Error','you have to login for this.','error');
    }
  }

  createStripeCharge(token,chapterdata){
      this._loader.startLoader('loader');
      const mainForm = new FormData();
      mainForm.append('stripeToken',token.id);
      mainForm.append('amount',chapterdata.price);
      this._api.createStripeTokenCharge(mainForm).subscribe(
        res => {
          if(res.error == false){
            this.chapterPurchased(res.data,chapterdata);
          }else{
            Swal.fire('Error', res.message);
          }
          this._loader.stopLoader('loader');
        },
        err => {
          this._loader.stopLoader('loader');
          Swal.fire('Error', 'Something Went Wrong Please try after Some time');
        }
      );
  }

  chapterPurchased(stripeData,chapter){
    this._loader.startLoader('loader');
    let userInfo = this._api.getUserDetailsFromStorage();
    const mainForm = new FormData();
    mainForm.append('stripeTransactionId',stripeData.id);
    mainForm.append('userId',userInfo.id);
    mainForm.append('chapterId',chapter.id);
    this._api.chapterPurchasedAPI(mainForm).subscribe(
      res => {
        if(res.error == false){
          localStorage.removeItem('chapterBookingData');
          localStorage.setItem('chapterBookingData',JSON.stringify(res.data));
          this._router.navigate(['chapter/purchase/thankyou']);
        }else{
          Swal.fire('Error', res.message);
        }
        this._loader.stopLoader('loader');
      },
      err => {
        this._loader.stopLoader('loader');
        Swal.fire('Error', 'Something Went Wrong Please try after Some time');
      }
    )
  }

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
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            // alert('Payment Success!!');
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }

}
