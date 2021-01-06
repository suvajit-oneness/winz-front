import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <h3 style="text-align:center; color: purple;">OOPs! page not found</h3>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
