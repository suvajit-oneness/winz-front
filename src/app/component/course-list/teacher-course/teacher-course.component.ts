import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent implements OnInit {

  public TeacherCourse: {data: TEACHERCOURSE[];};
  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {
    this.TeacherCourse = {data : []};
  }

  public userInfo : any = {};
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.getTeacherCourse(this.userInfo.teacherData.id);
  }

  getTeacherCourse(teacherId){
    this._loader.startLoader('loader');
    this._api.getTeacherCourse(teacherId).subscribe(
      res => {
        console.log(res);
        this.TeacherCourse.data = [];
        if(res.error == false){
            res.data.forEach((response) => {
                // pushing into All Teacher Course Interface
                this.TeacherCourse.data.push({
                    id : response.id,
                    categoryId : response.categoryId,
                    subjectCategoryId : response.subjectCategoryId,
                    teacherId : response.teacherId,
                    course_name : response.course_name,
                    course_image : response.course_image,
                    course_description : response.course_description,
                    categoryName : response.category.title,
                    subCategoryName : response.subjectcategory.title,
                    countLecture : response.lecture.length,
                    countChapter : response.chapter.length,
                    countFeature : response.feature.length,
                    price : response.course_price,
                });
            });
        }
        this._loader.stopLoader('loader');
      },err => {
          this._loader.stopLoader('loader');
      }
    )
  }

  deleteTeacherCourse(courseData){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        const formField = new FormData();
        formField.append('categoryId',courseData.categoryId);
        formField.append('subjectCategoryId',courseData.subjectCategoryId);
        formField.append('teacherId',courseData.teacherId);
        formField.append('courseId',courseData.id);
        this._api.deleteTeacherCourse(formField).subscribe(
          res => {
            if(res.error == false){
              Swal.fire('Deleted!',res.message,'success');
              this.getTeacherCourse(courseData.teacherId);
            }else{
              Swal.fire('Cancelled',res.message,'error');
            }
          },err => {
            Swal.fire('Error','Something went wrong please try after some time','error');
          }
        )
      }
    });
  }
}

interface TEACHERCOURSE{
  id : number,
  categoryId : number,
  subjectCategoryId : number,
  teacherId : number,
  course_name : string,
  course_image : string,
  course_description : string,
  categoryName : string,
  subCategoryName : string,
  countLecture : number,
  countChapter : number,
  countFeature : number,
  price : string,
}
