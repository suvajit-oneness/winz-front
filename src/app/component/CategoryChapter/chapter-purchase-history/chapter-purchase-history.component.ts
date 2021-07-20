import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-chapter-purchase-history',
  templateUrl: './chapter-purchase-history.component.html',
  styleUrls: ['./chapter-purchase-history.component.css']
})
export class ChapterPurchaseHistoryComponent implements OnInit {

  public chapter: {data: CHAPTER[];};
  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {
    this.chapter = {data : []};
  }

  public userInfo : any = {};
  ngOnInit(): void {
    this.userInfo = this._api.getUserDetailsFromStorage();
    this._loader.startLoader('loader');
    this._api.getSubscribedChapterList(this.userInfo.id).subscribe(
      res => {
        this.chapter.data = [];
        if(res.error == false){
          console.log(res);
          res.data.forEach((data) => {
            // let subjectChapter : any = data.chapter.sub_chapter;
            this.chapter.data.push({
              purchaseChapterId : data.id,
              chapterId : data.chapterId,
              chapterName : data.chapter.name,
              // categoryName : data.category.name,
              courseName : data.course.course_name,
              teacherName : data.teacher.name,
              teacherEmail : data.teacher.email,
              transactionId : data.transaction.id,
              transaction : data.transaction.transactionId,
              price : data.price,
            });
          });
        }
        this._loader.stopLoader('loader');
      },err => {
        this._loader.stopLoader('loader');
      }
    )
  }

  showTopics(topics){
    console.log(topics);
  }
}


interface CHAPTER{
  purchaseChapterId : number,
  chapterId : number,
  chapterName : string,
  // categoryName : string,
  courseName : string,
  teacherName : string,
  teacherEmail : string,
  transactionId : number,
  transaction : string,
  price : string,
}
