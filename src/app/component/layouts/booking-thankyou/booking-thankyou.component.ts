import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-booking-thankyou',
  template: `
  <ngx-ui-loader loaderId="loader" fgsColor="#FFFFFF" bgsOpacity="1" overlayColor="rgba(40,40,40,0.1)"></ngx-ui-loader>
  <section class="account-detail">
      <div class="d-flex">
          <ul class="aside">
              <app-sidebar></app-sidebar>
          </ul>
          <div class="account-sec mb-5">
              <h3>Payment Success</h3>
              <h3>Note : Please note the below Details for Future Referance</h3>
              <h4>Transaction Id : <a href="javascript:void(0)" class="value-rendered">{{transactionId}}</a></h4>
              <h4>Slot Booked : <a href="javascript:void(0)" class="value-rendered">{{slot.date}} - ( {{slot.time}} )</a></h4>
              <h4>Amount Received : <a href="javascript:void(0)" class="value-rendered">$ {{amount/100}}</a></h4>
              <h4>Booking Id : <a href="javascript:void(0)" class="value-rendered">{{bookingId}}</a></h4>
          </div>
      </div>
  </section>
  `,
  styles: [
  ]
})
export class BookingThankyouComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {}

  public transactionId = 0;
  public amount = 0;
  public bookingId = 0;
  public slot = {date:'N/A',time:'N/A'};

  ngOnInit(): void {
    this.loadRealData();
  }

  loadRealData(){
    let allData = localStorage.getItem('bookingData');
    let realData = JSON.parse(allData);
    console.log(realData);
    // Storing the value
    if(realData){
      this.bookingId = realData.booking.id;
      this.transactionId = realData.stripe.transactionId;
      this.amount = realData.stripe.amount;
      this.slot.date = realData.Schedule.date;
      this.slot.time = realData.Schedule.time;
    }
    // localStorage.removeItem('bookingData');
  }

}
