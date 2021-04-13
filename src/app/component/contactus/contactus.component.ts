import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {
    this._loader.startLoader('loader');
  }
  public errorMessage = '';public success='';
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._loader.stopLoader('loader');
    this.getContactusData();
  }

  public contactDatatoShow : any = {};
  getContactusData(){
    this._api.getConatctUsDataToShow().subscribe(
        res => {
          this.contactDatatoShow = res.data;
        },err => {

        }
    )
  }

  contactUsForm(formData){
    this.errorMessage='';this.success='';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = new FormData();
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key])
      });
      this._loader.startLoader('loader');
      this._api.postContactUsForm(mainForm).subscribe(
        res => {
          if(res.error == false){
            this.success = res.message;$('.resetForm').click();
          }else{
            this.errorMessage = res.message;
          }
          this._loader.stopLoader('loader');
        },
        err => {
          this.errorMessage = 'Something went wrong please try after some time';
        }
      )
    }
  }

}
