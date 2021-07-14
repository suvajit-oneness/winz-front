import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncodeDecodeBase64 } from 'src/globalFunction';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-subscription-thankyou',
  template: `
    <ngx-ui-loader loaderId="loader" fgsColor="#FFFFFF" bgsOpacity="1" overlayColor="rgba(40,40,40,0.1)"></ngx-ui-loader>
    <h3 style="text-align:center; color:purple;">Thankyou for the Subscribed the course
      <br>
      <a routerLink="/chaper/purchase/history">Click here to see your subscription</a>
    </h3>
  `,
  styles: [
  ]
})
export class SubscriptionThankyouComponent implements OnInit {
  public EncodeDecodeBase64 = EncodeDecodeBase64;
  constructor(private _loader : NgxUiLoaderService,
    private _activatedRoute:ActivatedRoute,
    private _api:APIService,
  ) {}

  public subscriptionId : any = 0;
  public userInfo : any = {};
  public courseInfo : any = {};
  ngOnInit(): void {
    this.subscriptionId = EncodeDecodeBase64(this._activatedRoute.snapshot.paramMap.get('subscriptionId'),'decode');
    this.userInfo = this._api.getUserDetailsFromStorage();
    window.scrollTo(0, 0);
    // this.getSubscriptionDetails(this.subscriptionId);
  }

  getSubscriptionDetails(subscriptionId){
    this._loader.startLoader('loader');
    this._api.getUserSubscribedCourses(this.userInfo.id,subscriptionId).subscribe(
      res => {
        if(res.error == false){
          this.courseInfo = res.data;
          // console.log(this.courseInfo);
          this._loader.stopLoader('loader');
        }
      },err => {}
    )
  }

}
