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
        console.log(res);
        this.chapter.data = [];
        if(res.error == false){
          res.data.forEach((data) => {
            let subjectChapter : any = data.chapter.sub_chapter;
            this.chapter.data.push({
              categoryName : data.chapter.category.title,
              subjectCategoryName : data.chapter.subject_category.title,
              chapterName : data.chapter.chapter,
              subjectChapter : subjectChapter,
              chapterId : data.chapter.id,
              purchaseChapterId : data.id,
              stripeTransactionId : data.stripeTransactionId,
              userId : data.userId,
              transactionId: data.stripe_transaction.transactionId,
              cardType : data.stripe_transaction.card_type,
              balanceTransactionId : data.stripe_transaction.balance_transaction,
              price : data.stripe_transaction.amount,
            });
          });
          console.log(this.chapter.data);
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
    categoryName : string,
    subjectCategoryName : string,
    chapterName : string,
    subjectChapter : any,
    chapterId : number,
    purchaseChapterId : number,
    stripeTransactionId : number,
    userId : number,
    transactionId: string,
    cardType : string,
    balanceTransactionId : string,
    price : string,
}
