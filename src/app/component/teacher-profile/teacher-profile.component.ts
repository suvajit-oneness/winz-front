import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import { EncodeDecodeBase64 } from 'src/globalFunction';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  public EncodeDecodeBase64 = EncodeDecodeBase64;

  constructor(private _loader : NgxUiLoaderService,private _activatedRoute:ActivatedRoute,private _api:APIService,private _router:Router) { }

  public teacherId : any = 0;public teacherData : any = {};
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.teacherId = EncodeDecodeBase64(this._activatedRoute.snapshot.paramMap.get('teacherId'),'decode');
    this.getTeacherDetailsAndTheirCourses(this.teacherId); // calling to get the Teacher Info
    this.getTeacherAllAvailableSlots(this.teacherId); // getting The Available Slots for Teacher
    this.loadStripe();
  }

  getTeacherDetailsAndTheirCourses(teacherId){
    this._loader.startLoader('loader');
    this._api.getTeacherDetails(teacherId).subscribe(
      res => {
        this.teacherData = res.data;
        this._loader.stopLoader('loader');
      },err => {}
    )
  }

  public slotsData = [];
  getTeacherAllAvailableSlots(teacherId){
    this._loader.startLoader('loader');
    this._api.getTeacherAvailableSlots(teacherId).subscribe(
      res => {
        if(res.error == false){
          this.slotsData = res.data;
        }
        this._loader.stopLoader('loader');
      },err => {this._loader.stopLoader('loader');}
    )
  }

  public bookSession(){
    Swal.fire('Warning', 'Please select the available slots');
  }

  public bookSlot(slotDetails){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Proceed for the Booking of '+ slotDetails.date+' and '+slotDetails.time+'!',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Proceed!',
    }).then((result) => {
      if (result.value) {
        this.proceedToPay(60,slotDetails.id);
      } 
    })
  }

  

  /********************************************** Stripe Payment Integration ****************************************************/

  public stripeKey = environment.stripeKey; // Stripe Key
  public stripeCesret = environment.stripeSecret; // Stripe Token

  handler:any = null;

    proceedToPay(amount:any,slotId) {
        var handler = (<any>window).StripeCheckout.configure({
          key: this.stripeKey,
          locale: 'auto',
          // token: function (token: any) {
          token: (token: any) => {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
              this.createStripeCharge(token.id,amount,slotId)
          }
        });
        handler.open({
          name: 'Winz',
          // description: '2 widgets',
          amount: amount * 100
        });
    }

    public createStripeCharge(stripeToken,amount,slotId)
    {
        this._loader.startLoader('loader');
        const mainForm = new FormData();
        mainForm.append('stripeToken',stripeToken);
        mainForm.append('amount',amount);
        this._api.createStripeTokenCharge(mainForm).subscribe(
          res => {
            if(res.error == false){
              this.bookingTheSlot(res.data,slotId);
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

    public bookingTheSlot(paymentData,slotId){
        let userinfo = this._api.getUserDetailsFromStorage();
        this._loader.startLoader('loader');
        const mainForm = new FormData();
        mainForm.append('stripeTransactionId',paymentData.id);
        mainForm.append('slotId',slotId);
        mainForm.append('userId',userinfo.id);
        this._api.purchaseBookingSlot(mainForm).subscribe(
          res => {
            if(res.error == false){
              localStorage.removeItem('bookingData');
              localStorage.setItem('bookingData',JSON.stringify(res.data));
              this._router.navigate(['booking-thankyou']);
            }else{
              Swal.fire('Error', res.message);
            }
            this._loader.stopLoader('loader');
          },err => {
            this._loader.stopLoader('loader');
            Swal.fire('Error', 'Something Went Wrong Please try after Some time.');
          }
        );
    }
 
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
              console.log(token)
              alert('Payment Success!!');
            }
          });
        }
        window.document.body.appendChild(s);
      }
    }

  /********************************************** Stripe Payment Integration Done ****************************************************/
}
