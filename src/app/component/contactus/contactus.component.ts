import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService) {
    this._loader.startLoader('loader');
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this._loader.stopLoader('loader');
  }

}
