import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _activated:ActivatedRoute) {}

  public userInfo : any = {};
  public courseId : any = 0;public course : any = {};
  public chapterId : any = 0;public chapter : any = {};
  public subChapterId : any = [];public subChapter : any = {};
  public questionList : any = [];
  
  ngOnInit(): void {
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.courseId = this._activated.snapshot.paramMap.get('courseId');
    this.chapterId = this._activated.snapshot.paramMap.get('chapterId');
    this.subChapterId = this._activated.snapshot.paramMap.get('subChapterId');
    this.getQuestionList(this.chapterId,this.subChapterId);
  }

  getQuestionList(chapterId,subChapterId){
    this._api.getQuestionList(chapterId,0,subChapterId).subscribe(
      res => {
        this.questionList = res.data;
        res.data.forEach(element => {
          // Chapter
          this.chapter.id = element.chapter.id;
          this.chapter.name = element.chapter.name;
          this.chapter.description = element.chapter.description;
          this.chapter.price = element.chapter.price;
          // SubChapter
          this.subChapter.id = element.subchapter.id;
          this.subChapter.name = element.subchapter.name;
          this.subChapter.topics = element.subchapter.topics;
        });
        console.log(res);
      }
    )
  }

  deleteQuestionList(questionData:any){
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
        formField.append('teacherId',this.userInfo.teacherData.id);
        formField.append('subChapterId',this.subChapterId);
        formField.append('chapterId',this.chapterId);
        formField.append('courseId',this.courseId);
        formField.append('questionId',questionData.id);
        this._api.deleteQuestionAPI(formField).subscribe(
          res => {
            if(res.error == false){
              Swal.fire('Deleted!',res.message,'success');
              this.getQuestionList(this.chapterId,this.subChapterId);
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
