import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-course-chapter',
  templateUrl: './edit-course-chapter.component.html',
  styleUrls: ['./edit-course-chapter.component.css']
})
export class EditCourseChapterComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _activated:ActivatedRoute) {}

  public userInfo : any = {};
  public course : any = {};public chapter : any = {};
  public courseId : any = 0;public category : any = [];
  public errorMsg = ''; public successMsg = '';public chapterId : any = 0;

  ngOnInit(): void {
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.courseId = this._activated.snapshot.paramMap.get('courseId');
    this.chapterId = this._activated.snapshot.paramMap.get('chapterId');
    this.getCourseDetails(this.courseId);
  }

  getCourseDetails(courseId){
    this._api.editTeacherCourse(courseId).subscribe(
      res => {
        this.course = res.data;
        res.data.chapter.forEach((chapter) => {
          if(chapter.id == this.chapterId){
            this.chapter.courseId = chapter.courseId;
            this.chapter.description = chapter.description;
            this.chapter.id = chapter.id;
            this.chapter.name = chapter.name;
            this.chapter.price = chapter.price;
          }
        });
        this.category = res.data.category;
      }
    )
  }

  createNewChapter(formData){
    this.errorMsg = '';this.successMsg = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = new FormData();
      mainForm.append('formType','edit');
      mainForm.append('courseId',this.courseId);
      mainForm.append('teacherId',this.userInfo.teacherData.id);
      mainForm.append('chapterId',this.chapter.id);
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key]);
      });
      this._loader.startLoader('loader');
      this._api.createCourseChapter(mainForm).subscribe(
        res => {
          if(res.error == false){
            Swal.fire('Success!', res.message, 'success');
          }else{
            Swal.fire('Error!', res.message, 'error');
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
