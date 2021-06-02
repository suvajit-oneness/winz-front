import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-booking-request',
  templateUrl: './booking-request.component.html',
  styleUrls: ['./booking-request.component.css']
})
export class BookingRequestComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {}
  public teacherInfo : any = {};
  ngOnInit(): void {
    this.teacherInfo = this._api.getUserDetailsFromStorage();
    this.getBookingRequest(this.teacherInfo.teacherData.id);
  }

  public data = [];
  getBookingRequest(teacherId){
      this._loader.startLoader('loader');
      this._api.getBookingRequest(teacherId).subscribe(
          res => {
            this.data = res.data;
            // console.log(res),
            this._loader.stopLoader('loader');
          },err => {
            this._loader.stopLoader('loader');
          }
      );
  }

}
