import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import { isNumberKey } from 'src/globalFunction';

@Component({
  selector: 'app-edit-category-chapter',
  templateUrl: './edit-category-chapter.component.html',
  styleUrls: ['./edit-category-chapter.component.css']
})
export class EditCategoryChapterComponent implements OnInit {
  public isNumberKey = isNumberKey;

  public categoryClass: {data: CATEGORY[];};
  public subjectcategoryClass: {data: SUBJECTCATEGORY[];};

  public subChapter: {data: TOPIC[];};

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _activatedRoute:ActivatedRoute) {
    this.categoryClass = {data : []};
    this.subjectcategoryClass = {data : []};
    this.subChapter = {data : []};
  }

  public chapterId = this._activatedRoute.snapshot.paramMap.get('chapterId');

  public teacherInfo : any = {};
  ngOnInit(): void {
    this.teacherInfo = this._api.getUserDetailsFromStorage();
    this.getCategoryAndSubjectCategoryList();

    this.getChapterData(this.chapterId); // getting the Data of the Selected Chapter
  }

  getCategoryAndSubjectCategoryList(){
    this._loader.startLoader('loader');
    this._api.getCategoryAndSubjectCategoryList().subscribe(
        res => {
          this.categoryClass.data = [];
          res.data.category.forEach((category) => {
            this.categoryClass.data.push({
              id : category.id,title : category.title,full_name : category.full_name
            });
          });
          this.subjectcategoryClass.data = [];
          res.data.subjectCategory.forEach((subcategory) => {
            this.subjectcategoryClass.data.push({
              id: subcategory.id,
              categoryId : subcategory.categoryId,
              title:subcategory.title,
              image:subcategory.image
            });
          });
          this._loader.stopLoader('loader');
        },err => {
          this._loader.stopLoader('loader');
        }
    );
  }

  public subjectCategoryData = [];
  filterSubjectCategory(categoryId){
    this.subjectCategoryData = [];
    this.subjectcategoryClass.data.forEach((matchData) => {
      if(matchData.categoryId == categoryId){
        this.subjectCategoryData.push(
          {
            id : matchData.id,
            categoryId : matchData.categoryId,
            title : matchData.title,
            image : matchData.image
          }
        );
      }
    });
  }

  public addNewSubChapter(){
    this.subChapter.data.push({
      name : '',topics : '',
    });
  }

  public removeSubChapter(row){
    const index = this.subChapter.data.indexOf(row);
    this.subChapter.data.splice(index, 1);
  }

  public chapterData : any = {};
  getChapterData(chapterId){
    this._loader.startLoader('loader');
    this._api.getChapterList(0,chapterId).subscribe(
      res => {
        this.chapterData = {};
        if(res.data.length > 0){
          let newData = res.data[0];
          this.chapterData.id = newData.id;
          this.chapterData.categoryId = newData.categoryId;
          this.chapterData.subjectCategoryId = newData.subjectCategoryId;
          this.chapterData.chapter = newData.chapter;
          this.chapterData.price = newData.price;
          this.filterSubjectCategory(newData.categoryId);
          newData.sub_chapter.forEach((topic) => {
            this.subChapter.data.push({
              name : topic.name,
              topics : topic.topics,
            });
          })
        }
        this._loader.stopLoader('loader');
      },err => {
        this._loader.stopLoader('loader');
      }
    )
  }

  public errorMsg = '';public successMsg = '';
  updateChapter(formData){
    this.errorMsg = '';this.successMsg = '';
    for(let i in formData.controls){
      formData.controls[i].markAsTouched();
    }
    if(formData.valid){
      this._loader.startLoader('loader');
      const formField = new FormData();
      formField.append('teacherId',this.teacherInfo.id);
      formField.append('chapterId',this.chapterId);
      formField.append('category',formData.value['category']);
      formField.append('subcategory',formData.value['subcategory']);
      formField.append('chapter',formData.value['chapter']);
      formField.append('price',formData.value['price']);
      this.subChapter.data.forEach((subcategory) => {
        formField.append('title[]',subcategory.name);
        formField.append('topic[]',subcategory.topics);
      });
      this._api.updateChapter(formField).subscribe(
        res => {
          if(res.error == false){
            this.successMsg = res.message;
          }else{
            this.errorMsg = res.message;
          }
          this._loader.stopLoader('loader');
        },err => {
          this.errorMsg = 'Something Went Wrong Please try after Some time';
          this._loader.stopLoader('loader');
        }
      )
    }else{
      this.errorMsg = 'Please fill all the details correctly';
    }
  }
}

interface CATEGORY{
  id : number,title : string,full_name : string
}

interface SUBJECTCATEGORY{
  id: number,categoryId : number,title:string,image:string,
}

interface TOPIC{
  name : string, topics : string,
}

