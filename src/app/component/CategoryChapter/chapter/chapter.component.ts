import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import { EncodeDecodeBase64 } from 'src/globalFunction';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  public EncodeDecodeBase64 = EncodeDecodeBase64;
  constructor(private _loader : NgxUiLoaderService,private _activatedRoute:ActivatedRoute,private _api:APIService) {
    this._loader.startLoader('loader');
  }

  public subjectCategoryId;
  public chapterList : any = [];

  public categoryName=''; public subjectCategoryName = '';

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._loader.stopLoader('loader');
    this.subjectCategoryId = EncodeDecodeBase64(this._activatedRoute.snapshot.paramMap.get('subjectCategoryId'),'decode');
    this.getChapters(this.subjectCategoryId);
  }

  getChapters(subjectCategoryId=0,chapter=0){
    this._loader.startLoader('loader');
    this._api.getChapterList(subjectCategoryId,chapter).subscribe(
      res => {
        this.chapterList = res.data;
        Object.keys(res.data).forEach((key)=>{
          this.categoryName = res.data[key].category.full_name;
          this.subjectCategoryName = res.data[key].subject_category.title;
        });
        console.log(this.chapterList);
      },err => {}
    )
    this._loader.stopLoader('loader');
  }

}
