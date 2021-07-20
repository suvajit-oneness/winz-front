import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _activatedRoute:ActivatedRoute,private _api:APIService) {}
  public chapterId : any = 0;public categoryId : any = 0;public subChapterId : any = 0;
  public questionList : any = [];
  public chapter : any = {};public category : any = {};public subchapter : any = {};

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.chapterId = this._activatedRoute.snapshot.paramMap.get('chapterId');
    this.categoryId = this._activatedRoute.snapshot.paramMap.get('categoryId');
    this.subChapterId = this._activatedRoute.snapshot.paramMap.get('subChapterId');
    this.getRelatedQuestion();
  }

  getRelatedQuestion(){
      const mainForm = new FormData();
      this._loader.startLoader('loader');
      this._api.getQuestionList(this.chapterId,this.categoryId,this.subChapterId).subscribe(
      res => {
        window.scrollTo(0, 0);
        this.questionList = res.data;
        res.data.forEach(response => {
          // Category Data
          this.category.id = response.category.id;
          this.category.name = response.category.name;
          this.category.image = response.category.image;
          // Chapter Data
          this.chapter.id = response.chapter.id;
          this.chapter.name = response.chapter.name;
          this.chapter.price = response.chapter.price;
          this.chapter.courseId = response.chapter.courseId;
          // Sub - Chapter Data
          this.subchapter.id = response.subchapter.id;
          this.subchapter.name = response.subchapter.name;
          this.subchapter.topics = response.subchapter.topics;
          this.subchapter.courseId = response.subchapter.courseId;
        });
        console.log(res);
      },err => {}
    )
    this._loader.stopLoader('loader');
  }

  getProgress(difficulty){
    let level = 'Easy';let value = 33;let color = 'blue';
    switch(difficulty){
      case 1:level = 'Easy';value = 33;color='blue';break;
      case 2:level = 'Medium';value = 66;color='yellow';break;
      case 3:level = 'Hard';value = 99;color='red';break;
      default:break;
    }
    return level;
    return level +' <progress value="'+value+'" max="100" style="border-color: '+color+';"></progress>';
  }

}
