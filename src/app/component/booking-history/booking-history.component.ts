import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {}
  public userInfo : any = {};

  ngOnInit(): void {
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.getBookingHistory(this.userInfo.id);
  }

  public data : any = [];
  public getBookingHistory(userId){
    this._loader.startLoader('loader');
      this._api.getPaymentHistory(userId).subscribe(
          res => {
            this.data = res.data;
            console.log(res),
            this._loader.stopLoader('loader');
          },err => {
            this._loader.stopLoader('loader');
          }
      );
  }
}
