import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _activated:ActivatedRoute, private _router: Router) {}

  public userInfo : any = {};
  public courseId : any = 0;public course : any = {};
  public chapterId : any = 0;public chapter : any = {};
  public subChapterId : any = [];public subChapter : any = {};
  public categoryList : any = [];
  public errorMsg : any = '';
  public successMsg : any = '';
  public categoryId : any = 1;
  public fileFormatError = '';
  public selectedFile : File;public hasFile : boolean;

  ngOnInit(): void {
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.courseId = this._activated.snapshot.paramMap.get('courseId');
    this.chapterId = this._activated.snapshot.paramMap.get('chapterId');
    this.subChapterId = this._activated.snapshot.paramMap.get('subChapterId');
    this.getCategoryData();
  }
  getCategoryData() {
    // this._api.getCategoryList().subscribe(
    //   res => {
    //     console.log(res.data.category);
    //     this.categoryList = res.data.category;
    //   }, err => {}
    // )
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

  createQuestion(formData) {
    this.errorMsg = '';this.successMsg = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = new FormData();
      mainForm.append('chapterId',this.chapterId);
      mainForm.append('subChapterId',this.subChapterId);
      mainForm.append('categoryId', this.categoryId);
      mainForm.append('formType','addForm');
      if(this.hasFile){
        mainForm.append('question',this.selectedFile);
      }
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key])
      });
      
      // console.log(formData.value);
      
      this._loader.startLoader('loader');
      this._api.createQuestion(mainForm).subscribe(
        res => {
          console.log(res);
          
          if(res.error == false){
            Swal.fire('Success!', res.message, 'success');
            formData.form.reset();
            this._router.navigate(['/teacher/'+this.courseId+'/'+this.chapterId+'/'+this.subChapterId+'/question'])
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
