import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _api:APIService) { }
  public errorMessage = '';
  ngOnInit(): void {
  }

  userLoginSubmit(formData){
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = new FormData();
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key])
      });
      this._api.userLoginAPI(mainForm).subscribe(
        res => {
          if(res.error == false){
            this._api.storeUserLocally(res);
          }else{
            this.errorMessage = res.message;
          }
        },
        err => {
          this.errorMessage = 'Something went wrong please try after some time';
        }
      )
    }else{
      this.errorMessage = 'Please fill out all the details';
    }
    // console.log('Form Data SUbmitted');
  }

}
