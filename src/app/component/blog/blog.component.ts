import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public url = environment.apiUrl;
  constructor(private _api:APIService,private _loader : NgxUiLoaderService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getBlogsList();
  }

  public blogs : any = [];
  public getBlogsList(){
    this._loader.startLoader('loader');
    this._api.getBlogsList().subscribe(
      res => {
        this.blogs = res.data;
        this._loader.stopLoader('loader');
      },
      err => {
        this._loader.stopLoader('loader');
      }
    )
  }

}
