import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-chapter-subchapter-edit',
  templateUrl: './course-chapter-subchapter-edit.component.html',
  styleUrls: ['./course-chapter-subchapter-edit.component.css']
})
export class CourseChapterSubchapterEditComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _activated:ActivatedRoute) {}

  public userInfo : any = {};
  public courseId : any = 0;public course : any = {};
  public chapterId : any = 0;public chapter : any = {};
  public subChapterId : any = 0; public subChapter : any = {};

  ngOnInit(): void {
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.courseId = this._activated.snapshot.paramMap.get('courseId');
    this.chapterId = this._activated.snapshot.paramMap.get('chapterId');
    this.subChapterId = this._activated.snapshot.paramMap.get('subChapterId');
    this.createSubChapter(this.courseId,this.chapterId,this.subChapterId);
  }

  createSubChapter(courseId,chapterId,subChapterId){
    this._api.createSubChapter(courseId,chapterId,'edit',subChapterId).subscribe(
      res => {
        this.chapter = res.data;
        this.subChapter = res.data.subchapter;
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
      mainForm.append('formType','edit');
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key])
      });
      mainForm.append('teacherId',this.userInfo.teacherData.id);
      mainForm.append('courseId',this.courseId);
      mainForm.append('chapterId',this.chapterId);
      mainForm.append('subChapterId',this.subChapterId);
      // this._loader.startLoader('loader');
      this._api.createChapterSubChapter(mainForm).subscribe(
        res => {
          if(res.error == false){
            Swal.fire('Success!', res.message, 'success');
            // formData.form.reset();
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

