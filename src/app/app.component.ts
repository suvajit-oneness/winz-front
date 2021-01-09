import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { APIService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'winz-frontend';
  public showHeaderFooter: boolean = false;
  constructor(private _api:APIService,private _router:Router){
    _router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/signup') {
          this.showHeaderFooter = false;
        } else {
          this.showHeaderFooter = true;
        }
      }
    });
  }
}
