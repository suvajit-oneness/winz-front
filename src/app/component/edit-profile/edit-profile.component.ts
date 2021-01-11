import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { $ } from 'protractor';
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
  public successMsg = '';public errorMsg = '';public fileFormatError = '';
  public userImage;public selectedFile : File;public hasFile : boolean;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._loader.stopLoader('loader');
    this.getUserInfo();
    this.userImage = this.userInfo.image;
    this.hasFile = false;
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
      if(this.hasFile){
        mainForm.append('userImage',this.selectedFile);
      }
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

  onSelectFile(event) {
    this.fileFormatError = '';this.hasFile = false;
    this.selectedFile = event.target.files[0];
    if(this.selectedFile != undefined && this.selectedFile != null){
        let validFormat = ['png','jpeg','jpg'];
        let fileName = this.selectedFile.name.split('.').pop();
        let data = validFormat.find(ob => ob === fileName);
        if(data != null || data != undefined){
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]); // read file as data url
          reader.onload = (event) => { // called once readAsDataURL is completed
            this.userImage = event.target.result;this.hasFile = true;
          }
          return true;
        }
        this.fileFormatError = 'This File Format is not accepted';
    }
    this.getUserInfo(); // calling to get updated user Data
    this.userImage = this.userInfo.image;
    return false;
  }

}
