import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course-chapter',
  templateUrl: './add-course-chapter.component.html',
  styleUrls: ['./add-course-chapter.component.css']
})
export class AddCourseChapterComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _activated:ActivatedRoute) {}

  public userInfo : any = {};
  public course : any = {};public chapters : any = [];
  public courseId : any = 0;
  public errorMsg = ''; public successMsg = '';

  ngOnInit(): void {
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.courseId = this._activated.snapshot.paramMap.get('courseId');
    this.getCourseDetails(this.courseId);
  }

  getCourseDetails(courseId){
    this._api.editTeacherCourse(courseId).subscribe(
      res => {
        this.course = res.data;
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
      mainForm.append('formType','add');
      mainForm.append('courseId',this.courseId);
      mainForm.append('teacherId',this.userInfo.teacherData.id);
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key]);
      });
      this._loader.startLoader('loader');
      this._api.createCourseChapter(mainForm).subscribe(
        res => {
          if(res.error == false){
            Swal.fire('Success!', res.message, 'success');
            formData.form.reset();
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
