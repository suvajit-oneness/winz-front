import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {
    this._loader.startLoader('loader');
  }

  public memberShip : any = [];public commonQuestion : any = [];

  ngOnInit(): void {
    this._loader.stopLoader('loader');
    this.getMemberShipList();
    window.scrollTo(0, 0);
  }
  
  getMemberShipList() {
    this._loader.startLoader('loader');
    this._api.getMembershipList().subscribe(
      res => {
        if(res.error == false){
          this.memberShip = res.data.membership;
          this.commonQuestion = res.data.commonQuestion;
        }
        console.log(res);
      },err => {}
    )
    this._loader.stopLoader('loader');
  }

}
