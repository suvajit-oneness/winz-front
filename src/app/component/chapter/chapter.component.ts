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

  public subjectCategory;
  public chapterList : any = [];

  public subjectCategoryName = '';

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._loader.stopLoader('loader');
    this.subjectCategory = EncodeDecodeBase64(this._activatedRoute.snapshot.paramMap.get('subjectCategory'),'decode');
    this.getChapters(this.subjectCategory);
  }

  getChapters(subjectCategory=0,chapter=0){
    this._loader.startLoader('loader');
    this._api.getChapterList(subjectCategory,chapter).subscribe(
      res => {
        this.chapterList = res.data;
        Object.keys(res.data).forEach((key)=>{
          this.subjectCategoryName = res.data[key].subject_category.full_name;
        });
        // console.log(this.chapterList);
      },err => {}
    )
    this._loader.stopLoader('loader');
  }

}
