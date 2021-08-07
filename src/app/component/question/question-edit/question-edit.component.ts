import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import { Location } from "@angular/common";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _activated:ActivatedRoute, private _router: Router, private _location: Location) {}

  public userInfo : any = {};
  public courseId : any = 0;public course : any = {};
  public chapterId : any = 0;public chapter : any = {};
  public subChapterId : any = [];public subChapter : any = {};
  public categoryList : any = [];
  public errorMsg : any = '';
  public successMsg : any = '';
  public questionId : any = '';
  public fileFormatError = '';
  public selectedFile : File;public hasFile : boolean;
  public questionDetail : any = []; 

  ngOnInit(): void {
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.questionId = this._activated.snapshot.paramMap.get('questionId');
    this.getCategoryData();
    this.getQuestionData(this.questionId);
  }
  getCategoryData() {
    // this._api.getCategoryList().subscribe(
    //   res => {
    //     console.log(res.data.category);
    //     this.categoryList = res.data.category;
    //   }, err => {}
    // )
  }
  getQuestionData(reqQuestionId) {
    this._api.getParticularQuestion(reqQuestionId).subscribe(
      res => {
        console.log(res);
        this.questionDetail = res.data;
      }, err => {}
    )
  }
  backToPrev() {
    this._location.back();
  }

  public courseImage;
  onSelectFile(event) {
    this.fileFormatError = '';this.hasFile = false;
    this.selectedFile = event.target.files[0];
    if(this.selectedFile != undefined && this.selectedFile != null){
        let validFormat = ['png','jpeg','jpg', 'gif'];
        let fileName = this.selectedFile.name.split('.').pop();
        let data = validFormat.find(ob => ob === fileName);
        if(data != null || data != undefined){
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]); // read file as data url
          reader.onload = (event) => { // called once readAsDataURL is completed
            this.courseImage = event.target.result;this.hasFile = true;
          }
          return true;
        }
        this.fileFormatError = 'This File Format is not accepted';
    }
    return false;
  }

  editQuestion(formData) {
    this.errorMsg = '';this.successMsg = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = new FormData();
      mainForm.append('formType','editForm');
      mainForm.append('categoryId', this.questionDetail.categoryId);
      mainForm.append('chapterId', this.questionDetail.chapterId);
      mainForm.append('subChapterId', this.questionDetail.subChapterId);
      mainForm.append('questionId', this.questionId);
      if(this.hasFile){
        mainForm.append('question',this.selectedFile);
      }
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key])
      });

      this._loader.startLoader('loader');
      this._api.createQuestion(mainForm).subscribe(
        res => {
          console.log(res);
          
          if(res.error == false){
            Swal.fire('Success!', res.message, 'success');
            formData.form.reset();
            this.backToPrev();
          }
          this._loader.stopLoader('loader');
        },
        err => {
          this._loader.stopLoader('loader');
        },
      )
    }else{
      this.errorMsg = 'Plese fill all the form';
    }
  }

}
