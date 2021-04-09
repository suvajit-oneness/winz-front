import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-user-member-ship',
  templateUrl: './user-member-ship.component.html',
  styleUrls: ['./user-member-ship.component.css']
})
export class UserMemberShipComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {}

  public userInfo : any = {};

  ngOnInit(): void {
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.getMemberShipHistory(this.userInfo.id,this.userInfo.userType);
  }

  public data : any = [];
  public getMemberShipHistory(userId,userType){
    this._loader.startLoader('loader');
      this._api.getUserMembershipHistory(userId,userType).subscribe(
          res => {
            this.data = res.data;
            console.log(this.data);
            this._loader.stopLoader('loader');
          },err => {
            this._loader.stopLoader('loader');
          }
      );
  }

}
