import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-chapter-subchapter-list',
  templateUrl: './course-chapter-subchapter-list.component.html',
  styleUrls: ['./course-chapter-subchapter-list.component.css']
})
export class CourseChapterSubchapterListComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _activated:ActivatedRoute) {}

  public teacherInfo : any = {};
  public courseId : any = 0;public course : any = {};
  public chapterId : any = 0;public chapter : any = {};
  public subchapter : any = [];
  
  ngOnInit(): void {
    this.teacherInfo = this._api.getUserDetailsFromStorage();
    this.courseId = this._activated.snapshot.paramMap.get('courseId');
    this.chapterId = this._activated.snapshot.paramMap.get('chapterId');
    this.getCourseChapterSubChapterDetails(this.chapterId);
  }

  getCourseChapterSubChapterDetails(chapterId){
    this._api.getSubChapterList(0,chapterId).subscribe(
      res => {
        this.subchapter = res.data;
        res.data.forEach(element => {
          // Chapter
          this.chapter.id = element.chapter.id;
          this.chapter.name = element.chapter.name;
          this.chapter.description = element.chapter.description;
          this.chapter.price = element.chapter.price;
          // Course
          this.course.id = element.course.id;
          this.course.course_name = element.course.course_name;
          this.course.course_image = element.course.course_image;
          this.course.course_description = element.course.course_description;
        });
        console.log(res);
      }
    )
  }

  deleteSubChapter(SubChapterData:any){
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
        formField.append('subChapterId',SubChapterData.id);
        formField.append('chapterId',this.chapter.id);
        formField.append('courseId',this.course.id);
        this._api.deleteSubChapter(formField).subscribe(
          res => {
            if(res.error == false){
              Swal.fire('Deleted!',res.message,'success');
              this.getCourseChapterSubChapterDetails(this.chapterId);
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
