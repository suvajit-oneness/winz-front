import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import { isNumberKey } from 'src/globalFunction';

@Component({
  selector: 'app-new-category-chapter',
  templateUrl: './new-category-chapter.component.html',
  styleUrls: ['./new-category-chapter.component.css']
})
export class NewCategoryChapterComponent implements OnInit {
  public isNumberKey = isNumberKey;

  public categoryClass: {data: CATEGORY[];};
  public subjectcategoryClass: {data: SUBJECTCATEGORY[];};

  public subChapter: {data: TOPIC[];};

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {
    this.categoryClass = {data : []};
    this.subjectcategoryClass = {data : []};
    this.subChapter = {data : []};
  }

  public teacherInfo : any = {};
  ngOnInit(): void {
    this.teacherInfo = this._api.getUserDetailsFromStorage();
    this.getCategoryAndSubjectCategoryList();

    this.addNewSubChapter(); // initialize the first Row
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

  public errorMsg = '';public successMsg = '';
  createNewChapter(formData){
    this.errorMsg = '';this.successMsg = '';
    for(let i in formData.controls){
      formData.controls[i].markAsTouched();
    }
    if(formData.valid){
      this._loader.startLoader('loader');
      const formField = new FormData();
      formField.append('teacherId',this.teacherInfo.id);
      formField.append('category',formData.value['category'].trim());
      formField.append('subcategory',formData.value['subcategory'].trim());
      formField.append('chapter',formData.value['chapter'].trim());
      formField.append('price',formData.value['price'].trim());
      this.subChapter.data.forEach((subcategory) => {
        formField.append('title[]',subcategory.name);
        formField.append('topic[]',subcategory.topics);
      });
      this._api.addNewCategory(formField).subscribe(
        res => {
          if(res.error == false){
            this.successMsg = res.message;
          }else{
            this.errorMsg = res.message;
          }
          this._loader.stopLoader('loader');
        },err => {
          this.errorMsg = '';
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
