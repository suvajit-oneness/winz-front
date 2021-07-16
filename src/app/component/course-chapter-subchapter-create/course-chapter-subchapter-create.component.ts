import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-chapter-subchapter-create',
  templateUrl: './course-chapter-subchapter-create.component.html',
  styleUrls: ['./course-chapter-subchapter-create.component.css']
})
export class CourseChapterSubchapterCreateComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _activated:ActivatedRoute) {}

  public userInfo : any = {};
  public courseId : any = 0;public course : any = {};
  public chapterId : any = 0;public chapter : any = {};

  ngOnInit(): void {
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.courseId = this._activated.snapshot.paramMap.get('courseId');
    this.chapterId = this._activated.snapshot.paramMap.get('chapterId');
    this.createSubChapter(this.courseId,this.chapterId);
  }

  createSubChapter(courseId,chapterId){
    this._api.createSubChapter(courseId,chapterId,'add').subscribe(
      res => {
        this.chapter = res.data;
        console.log(res);
      }
    )
  }

  public errorMsg = '';public successMsg = '';
  createNewSubChapterFormSubmit(formData){
    this.errorMsg = '';this.successMsg = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = new FormData();
      mainForm.append('formType','add');
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key])
      });
      mainForm.append('teacherId',this.userInfo.teacherData.id);
      mainForm.append('courseId',this.courseId);
      mainForm.append('chapterId',this.chapterId);
      // this._loader.startLoader('loader');
      this._api.createChapterSubChapter(mainForm).subscribe(
        res => {
          if(res.error == false){
            Swal.fire('Success!', res.message, 'success');
            formData.form.reset();
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
