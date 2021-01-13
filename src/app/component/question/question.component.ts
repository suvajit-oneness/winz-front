import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import { EncodeDecodeBase64 } from 'src/globalFunction';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public EncodeDecodeBase64 = EncodeDecodeBase64;
  constructor(private _loader : NgxUiLoaderService,private _activatedRoute:ActivatedRoute,private _api:APIService) {
    this._loader.startLoader('loader');
  }

  public subjectCategory;public chapterId;
  public questionList : any = [];
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._loader.stopLoader('loader');
    this.subjectCategory = EncodeDecodeBase64(this._activatedRoute.snapshot.paramMap.get('subjectCategory'),'decode');
    this.chapterId = EncodeDecodeBase64(this._activatedRoute.snapshot.paramMap.get('chapterId'),'decode');
    this.getQuestion(this.subjectCategory,this.chapterId);
  }

  getQuestion(subjectCategoryId,chapterId){
    this._loader.startLoader('loader');
    this._api.getQuestionList(subjectCategoryId,chapterId).subscribe(
      res => {
        this.questionList = res.data;
        console.log(res);
      },err => {}
    )
    this._loader.stopLoader('loader');
  }

}
