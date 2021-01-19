import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
      <a routerLink="/"><img src="{{notFound}}" alt="404-not-found" height="100%" width="100%"></a>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent implements OnInit {

  public notFound = "/assets/img/banner_error_404.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
