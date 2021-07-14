import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-chapter-list',
  templateUrl: './course-chapter-list.component.html',
  styleUrls: ['./course-chapter-list.component.css']
})
export class CourseChapterListComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _activated:ActivatedRoute) {}

  public teacherInfo : any = {};
  public course : any = {};public chapters : any = [];
  public courseId : any = 0;

  ngOnInit(): void {
    this.teacherInfo = this._api.getUserDetailsFromStorage();
    this.courseId = this._activated.snapshot.paramMap.get('courseId');
    this.getCourseDetails(this.courseId);
  }

  getCourseDetails(courseId){
    this._api.editTeacherCourse(courseId).subscribe(
      res => {
        this.course = res.data;
        this.chapters = res.data.chapter;
      }
    )
  }

  deleteChapter(chapterData:any){
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
        formField.append('teacherId',this.teacherInfo.id);
        formField.append('chapterId',chapterData.id);
        formField.append('courseId',this.course.id);
        this._api.deleteChapter(formField).subscribe(
          res => {
            if(res.error == false){
              Swal.fire('Deleted!','Your imaginary file has been deleted.','success');
              this.getCourseDetails(this.courseId);
            }else{
              Swal.fire('Cancelled',res.message,'error');
            }
          },err => {
            Swal.fire('Error','Something went wrong please try after some time','error');
          }
        )
      }
      // else if (result.dismiss === Swal.DismissReason.cancel) {
          // Swal.fire('Deleted!','Your imaginary file has been deleted.','success');
      // }
    });
  }

}
