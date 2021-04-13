import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _router:Router) {
    this._loader.startLoader('loader');
  }

  public memberShip : any = [];public commonQuestion : any = [];

  public auth = this._api.isAuthenticated();
  public userInfo = this._api.getUserDetailsFromStorage();

  ngOnInit(): void {
    this.getMemberShipList();
    window.scrollTo(0, 0);
    this.loadStripe();
  }
  
  getMemberShipList() {
    this._loader.startLoader('loader');
    let userType = (this.auth) ? this.userInfo.userType : '';
    let userId = (this.auth) ? this.userInfo.id : 0;
    this._api.getMembershipList(userId,userType).subscribe(
      res => {
        if(res.error == false){
          this.memberShip = res.data.membership;
          this.commonQuestion = res.data.commonQuestion;
        }
      },err => {}
    )
    this._loader.stopLoader('loader');
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
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            // alert('Payment Success!!');
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }

  getMembership(memberShipData) {
    if(this.auth){
      var handler = (<any>window).StripeCheckout.configure({
        key: this.stripeKey,
        locale: 'auto',
        token: (token: any) => {
          this.createStripeCharge(token,memberShipData);
        }
      });
      handler.open({
        name: 'Winz',
        amount: parseFloat(memberShipData.price) * 100,
      });
    }else{
      Swal.fire('Warning', 'Please Login for continue booking');
      this._api.routeIntended('membership');
    }
  }

  createStripeCharge(token,membership){
      this._loader.startLoader('loader');
      const mainForm = new FormData();
      mainForm.append('stripeToken',token.id);
      mainForm.append('amount',membership.price);
      this._api.createStripeTokenCharge(mainForm).subscribe(
        res => {
          if(res.error == false){
            this.bookMemberSlot(res.data,membership);
          }else{
            Swal.fire('Error', res.message);
          }
          console.log('Response After Payment',res);
          this._loader.stopLoader('loader');
        },
        err => {
          this._loader.stopLoader('loader');
          Swal.fire('Error', 'Something Went Wrong Please try after Some time');
        }
      );
  }

  bookMemberSlot(transactionDetails,membersip){
      const mainForm = new FormData();
      mainForm.append('stripeTransactionId',transactionDetails.id);
      mainForm.append('membershipId',membersip.id);
      mainForm.append('userId',this.userInfo.id);
      mainForm.append('userType',this.userInfo.userType);
      this._loader.startLoader('loader');
      this._api.buyMemberShipforUser(mainForm).subscribe(
        res => {
          if(res.error == false){
              localStorage.removeItem('memberShipBookingData');
              localStorage.setItem('memberShipBookingData',JSON.stringify(res.data));
              this._router.navigate(['membership/booking-thankyou']);
          }else{
            Swal.fire('Error', res.message);
          }
          this._loader.stopLoader('loader');
        },err => {
          Swal.fire('Error', 'Something Went Wrong Please try after Some time');
          this._loader.stopLoader('loader');
        }

      )
  }

}
