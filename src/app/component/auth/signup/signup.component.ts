import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public errorMessage = '';
  constructor(private _api:APIService,private _loader : NgxUiLoaderService,private _router:Router) {
    this._loader.startLoader('loader');
  }

  ngOnInit(): void {
    if(this._api.isAuthenticated()){
      this._router.navigate(['/dashboard']);
    }
    this._loader.stopLoader('loader');
  }

  userSignUpForm(formData){
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = new FormData();
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key])
      });
      this._loader.startLoader('loader');
      this._api.userRegistrationAPI(mainForm).subscribe(
        res => {
          if(res.error == false){
            this._api.storeUserLocally(res);
          }else{
            this.errorMessage = res.message;
          }
          this._loader.stopLoader('loader');
        },
        err => {
          this.errorMessage = 'Something went wrong please try after some time';
        }
      )
    }else{
      this.errorMessage = 'Please fill out all the details';
    }
  }

}
