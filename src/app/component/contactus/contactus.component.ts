import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {
    this._loader.startLoader('loader');
  }
  public errorMessage = '';
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._loader.stopLoader('loader');
  }

  contactUsForm(formData){
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
