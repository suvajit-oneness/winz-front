import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-sidebar',
  template: `
      <li routerLinkActive="active"><a routerLink="/dashboard"><i class="ti-dashboard"></i> Dashboard</a></li>
      <li routerLinkActive="active"><a routerLink="/user/profile"><i class="ti-pencil-alt"></i> Edit Profile</a></li>
      <li routerLinkActive="active"><a routerLink="/user/password/change"><i class="ti-eraser"></i> Change Password</a></li>
      <li routerLinkActive="active"><a routerLink="/user/subscribed/course"><i class="ti-receipt"></i> Subscribed Courses</a></li>
      <li routerLinkActive="active"><a routerLink="/course-list"><i class="ti-book"></i> All Courses</a></li>
      <li routerLinkActive="active" *ngIf="userInfo.userType == 'teacher'"><a routerLink="/booking-request"><i class="ti-book"></i> Booking Request</a></li>
      <li routerLinkActive="active" *ngIf="userInfo.userType == 'user'"><a routerLink="/booking-history"><i class="ti-book"></i> Payment History</a></li>
      <li routerLinkActive="active" *ngIf="userInfo.userType == 'teacher'"><a routerLink="/schedule"><i class="ti-book"></i> Schedule</a></li>
      <li routerLinkActive="active" *ngIf="userInfo.userType == 'teacher'"><a routerLink="/events"><i class="ti-book"></i> Events</a></li>
      <li routerLinkActive="active"><a routerLink="/user/membership"><i class="ti-book"></i> Your Membership</a></li>
      <li routerLinkActive="active"><a routerLink="/user/zoom-meeting"><i class="ti-book"></i> Zoom Meetings</a></li>
      <li><a href="javascript:void(0)" (click)="userLogout()"><i class="ti-na"></i> Log Out</a></li>
  `,
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public userInfo : any = {};
  constructor(private _api:APIService) {}

  ngOnInit(): void {
    this.userInfo = this._api.getUserDetailsFromStorage();
  }

  userLogout(){
    this._api.logoutUser();
  }

}
