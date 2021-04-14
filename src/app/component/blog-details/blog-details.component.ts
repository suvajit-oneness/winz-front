import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  public url = environment.apiUrl;
  constructor(private _api:APIService,private _loader : NgxUiLoaderService,
    private _activatedRoute:ActivatedRoute,
    private _router: Router
  ) {}

  public blogId = this._activatedRoute.snapshot.paramMap.get('blogId');
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getBlogsDetails(this.blogId);
  }

  public blog : any = {};
  public getBlogsDetails(blogId){
    this._loader.startLoader('loader');
    this._api.getBlogsList(blogId).subscribe(
      res => {
        this.blog = res.data[0];
        this._loader.stopLoader('loader');
      },err => {
        this._loader.stopLoader('loader');
      }
    )
  }

}
