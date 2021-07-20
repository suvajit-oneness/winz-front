import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-sidebar',
  template: `
      <li routerLinkActive="active"><a routerLink="/dashboard"><i class="ti-dashboard"></i> Dashboard</a></li>
      <li routerLinkActive="active"><a routerLink="/user/profile"><i class="ti-pencil-alt"></i> Edit Profile</a></li>
      <li routerLinkActive="active"><a routerLink="/user/password/change"><i class="ti-eraser"></i> Change Password</a></li>
      <!-- <li routerLinkActive="active"><a routerLink="/user/subscribed/course"><i class="ti-receipt"></i> Subscribed Courses</a></li> -->
      <li routerLinkActive="active" *ngIf="teacherProfile"><a routerLink="/teacher/course/list"><i class="ti-book"></i> Your Courses</a></li>
      <!-- <li routerLinkActive="active" *ngIf="teacherProfile"><a routerLink="/user/chapter"><i class="ti-book"></i> Chapters</a></li> -->
      <li routerLinkActive="active" *ngIf="teacherProfile"><a routerLink="/booking-request"><i class="ti-book"></i> Booking Request</a></li>
      <li routerLinkActive="active" *ngIf="userProfile"><a routerLink="/slot-booking-history"><i class="ti-book"></i> Slot Booking History</a></li>
      <li routerLinkActive="active" *ngIf="teacherProfile"><a routerLink="/schedule"><i class="ti-book"></i> Schedule</a></li>
      <li routerLinkActive="active" *ngIf="teacherProfile"><a routerLink="/events"><i class="ti-book"></i> Events</a></li>
      <li routerLinkActive="active"><a routerLink="/chaper/purchase/history"><i class="ti-book"></i> Subscribed Chapter</a></li>
      <li routerLinkActive="active"><a routerLink="/user/membership"><i class="ti-book"></i> Your Membership</a></li>
      <li routerLinkActive="active"><a routerLink="/user/zoom-meeting"><i class="ti-book"></i> Zoom Meetings</a></li>
      <li><a href="javascript:void(0)" (click)="userLogout()"><i class="ti-na"></i> Log Out</a></li>
  `,
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public userInfo : any = {};

  public userProfile = false;public teacherProfile = false;
  constructor(private _api:APIService) {
    this.userInfo = this._api.getUserDetailsFromStorage();
    if(this.userInfo.userType === "teacher"){
      this.teacherProfile = true;
    }else if(this.userInfo.userType === "user"){
      this.userProfile = true;
    }
    // console.log(this.userInfo.userType+'=>'+this.userProfile+'=>'+this.teacherProfile);
  }

  ngOnInit(): void {}

  userLogout(){
    this._api.logoutUser();
  }

}
