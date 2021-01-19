import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import { EncodeDecodeBase64 } from 'src/globalFunction';

@Component({
  selector: 'app-subject-category',
  templateUrl: './subject-category.component.html',
  styleUrls: ['./subject-category.component.css']
})
export class SubjectCategoryComponent implements OnInit {

  public EncodeDecodeBase64 = EncodeDecodeBase64;
  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _activatedRoute:ActivatedRoute) {
    this._loader.startLoader('loader');
  }

  public category : any = 0;public subjectCategoryList : any = [];
  public categoryFullName = '';
  ngOnInit(): void {
    this.category = EncodeDecodeBase64(this._activatedRoute.snapshot.paramMap.get('categoryId'),'decode');
    this.subjectCategory(this.category);
  }

  subjectCategory(categoryId){
    this._api.getSubjectCategory(categoryId).subscribe(
      res => {
        window.scrollTo(0, 0);
        this._loader.stopLoader('loader');
        if(res.error == false){
          this.subjectCategoryList = res.data;
          Object.keys(res.data).forEach((key)=>{
            this.categoryFullName = res.data[key].category.full_name;
          });
        }
        // console.log(res);
      },
      err => {},
    )
    
  }

}
