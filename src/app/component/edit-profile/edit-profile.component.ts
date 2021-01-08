import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {
    this._loader.startLoader('loader');
  }

  public userInfo :any = {};
  public successMsg = '';public errorMsg = '';

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._loader.stopLoader('loader');
    this.getUserInfo();
  }

  getUserInfo(){
    this.userInfo = this._api.getUserDetailsFromStorage();
    // console.log(this.userInfo);
  }

  updateUserProfile(formData){
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
      this._api.updateUserProfile(mainForm).subscribe(
        res => {
          if(res.error == false){
            this._api.updateUserLocally(res);
            this.successMsg = 'Profile Updated Successfully';
          }else{
            this.errorMsg = res.message;
          }
          this._loader.stopLoader('loader');
        },err => {this.errorMsg = 'Something went wrong please try after some time'}
      )
    }
  }

}
