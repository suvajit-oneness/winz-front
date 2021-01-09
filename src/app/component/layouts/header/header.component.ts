import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userAuthentication : boolean = false;
  constructor(private _api:APIService) {}
  ngOnInit(): void {
    this.userAuthentication = this._api.isAuthenticated();
  }
}
