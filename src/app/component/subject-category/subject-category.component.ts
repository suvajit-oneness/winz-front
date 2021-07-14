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

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private _activatedRoute:ActivatedRoute) {
    this._loader.startLoader('loader');
  }
  public chapterId : any = 0;
  public category : any = [];
public categoryFullName = '';
  ngOnInit(): void {
    this.chapterId = this._activatedRoute.snapshot.paramMap.get('chapterId');
    this.getCategory();
  }

  getCategory(){
    this._loader.startLoader('loader');
    this._api.getCategoryList().subscribe(
      res => {
        window.scrollTo(0, 0);
        this._loader.stopLoader('loader');
        if(res.error == false){
          this.category = res.data.category;
        }
      },
      err => {},
    )
    
  }

}
