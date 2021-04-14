import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  public url = environment.apiUrl;
  constructor(private _api:APIService,private _loader : NgxUiLoaderService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getTestimonialsList();
  }

  public testimonials : any = [];
  public getTestimonialsList(){
    this._loader.startLoader('loader');
    this._api.getTestimonialsList().subscribe(
      res => {
        this.testimonials = res.data;
        this._loader.stopLoader('loader');
      },
      err => {
        this._loader.stopLoader('loader');
      }
    )
  }

}
