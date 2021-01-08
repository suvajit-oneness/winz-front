import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-sidebar',
  template: `
      <li routerLinkActive="active"><a routerLink="/dashboard"><i class="ti-dashboard"></i> Dashboard</a></li>
      <li routerLinkActive="active"><a routerLink="/user/profile"><i class="ti-pencil-alt"></i> Edit Profile</a></li>
      <li routerLinkActive="active"><a routerLink="/user/password/change"><i class="ti-eraser"></i> Change Password</a></li>
      <li routerLinkActive="active"><a routerLink="/user/subscribed/course"><i class="ti-receipt"></i> Subscribed Courses</a></li>
      <li routerLinkActive="active"><a routerLink="/course-list"><i class="ti-book"></i> Course Details</a></li>
      <li><a href="javascript:void(0)" (click)="userLogout()"><i class="ti-na"></i> Log Out</a></li>
  `,
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private _api:APIService) { }
  userAuthentication = false;
  ngOnInit(): void {
    this.userAuthentication = this._api.isAuthenticated();
  }

  userLogout(){
    this.userAuthentication = false;
    this._api.logoutUser();
  }

}
