import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-category-chapter',
  templateUrl: './category-chapter.component.html',
  styleUrls: ['./category-chapter.component.css']
})
export class CategoryChapterComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {}

  public teacherInfo : any = {};
  ngOnInit(): void {
    this.teacherInfo = this._api.getUserDetailsFromStorage();
    this.getChapterList(this.teacherInfo.id);
  }

  public data = [];
  getChapterList(teacherId){
    this._loader.startLoader('loader');
    this._api.getBookingRequest(teacherId).subscribe(
        res => {
          this.data = res.data;
          this._loader.stopLoader('loader');
        },err => {
          this._loader.stopLoader('loader');
        }
    );
}

}
