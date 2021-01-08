import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public successMsg = '';public errorMsg = '';public userInfo :any = {};
  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {
    this._loader.startLoader('loader');
  }

  ngOnInit(): void {
    this._loader.stopLoader('loader');
    this.userInfo = this._api.getUserDetailsFromStorage();
  }

  updateUserPassword(formData){
    this.errorMsg = '';this.successMsg = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = new FormData();
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key])
      });
      this._loader.startLoader('loader');
      this._api.updateUserPassword(mainForm).subscribe(
        res => {
          if(res.error == false){
            this.successMsg = res.message;
          }else{
            this.errorMsg = res.message;
          }
          this._loader.stopLoader('loader');
        },err => {this.errorMsg = 'Something went wrong please try after some time'}
      )
    }else{
      this.errorMsg = 'please fill out the details';
    }
  }

}
