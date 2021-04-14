import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { exit } from 'process';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public setting: {data: SETTINGDATA[];};

  constructor(private _api:APIService,private _loader : NgxUiLoaderService) {
    this.setting = {data : []}; // Initialise blank data to SCHEDULE interface
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.settingData();
  }

  public settingData(){
    this._loader.startLoader('loader');
    this._api.getSettingSEOData().subscribe(
      res => {
        this.setting.data = res.data;
        this._loader.stopLoader('loader');
      },
      err => {
        this._loader.stopLoader('loader');
      }
    )
  }

  getValueUsingKey(key){
    let response = '';
    this.setting.data.forEach((value) => {
      if(value.key === key){
        response = value.value
        exit;
      }
    });
    // console.log('getting value here',response);
    return response;
  }

}

interface SETTINGDATA{
  id : number,
  key : string,
  value : string,
  created_at : string,
  updated_at : string,
  deleted_at : string,
}